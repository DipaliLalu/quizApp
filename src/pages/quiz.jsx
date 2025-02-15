import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { endPoint } from '@/helper/axios';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast';
import Confetti from "@/components/ui/confetti";
import { useRouter } from "next/router";
import Link from 'next/link';


function Quiz() {
    const confettiRef = useRef(null);
    const [currectQuestion, setCurrectQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [quizComplete, setQuizComplete] = useState(false);
    const [questions, setQuestion] = useState('');
    const router = useRouter();

    const getQuestion = async () => {
        try {
            const path = endPoint.admin.getQuestion;
            const responese = await axios.get(path);
            setQuestion(responese.data.data)
        } catch (error) {
            toast.error(error.message)
        }
    }
    console.log(score)
    useEffect(() => {
        getQuestion();
    }, []);

    const handleSelectOption = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleClick = () => {
        if (selectedOption === questions[currectQuestion].correctAnswer) {
            setScore(score + 1);
        }
        if (currectQuestion < questions.length - 1) {
            setCurrectQuestion(currectQuestion + 1);
            setSelectedOption('');
        } else {
            setQuizComplete(true);
        }
    }

    if (quizComplete) {
        return (
            <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl min-h-screen">
                <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                    Congratulations
                </span>
                <div className='text-2xl mb-5'>Score is: {score}</div>
                {/* <Button onClick={() => (window.location.href = "/")}>Go to Home Page</Button> */}
                <Button onClick={() => router.push("/")}>
                    Go to Home Page
                </Button>

                <Confetti
                    ref={confettiRef}
                    className="absolute left-0 top-0 z-0 size-full"
                    onMouseEnter={() => {
                        confettiRef.current?.fire({});
                    }}
                />
            </div>
        )
    }
    return (
        <div className="bg-center flex justify-center items-center bg-fixed flex-col p-8 min-h-screen">
            <div className='md:w-1/2 w-full flex flex-col gap-4'>
                {questions && (
                    <><div>{currectQuestion + 1}. {questions[currectQuestion].question}</div>
                        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}
                        >
                            <div className='flex flex-col gap-2'>
                                {questions[currectQuestion].options.map((value, index) => {
                                    return <div className='flex items-center border gap-2 ps-3' key={index}><Input className='w-auto' type='radio' name='option' value={value} checked={selectedOption === value} onChange={handleSelectOption} />{value}</div>
                                })}
                            </div>
                            <div className='flex justify-end'>
                                <Button className='w-4/12' onClick={() => handleClick(questions[currectQuestion].correctAnswer)}>{currectQuestion < 9 ? "Next" : "Finish"}</Button>
                            </div>
                        </form></>)
                }
            </div>
        </div>
    )
}

export default Quiz
