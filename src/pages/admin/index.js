import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { endPoint } from '@/helper/axios';

const formSchema = z.object({
  question: z.string().nonempty({ message: "question 4 is required" }),
  option1: z.string().nonempty({ message: "Option 1 is required" }),
  option2: z.string().nonempty({ message: "Option 2 is required" }),
  option3: z.string().nonempty({ message: "Option 3 is required" }),
  option4: z.string().nonempty({ message: "Option 4 is required" }),
  correctAnswer: z.string().nonempty({ message: "correctAnswer 4 is required" }),
});

function Index() {
  const [loading, setLoading] = React.useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: '',
    },
  });

  console.log(form.formState.errors);
  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const { option1, option2, option3, option4, ...rest } = values;
      const payload = {
        ...rest,
        options: [option1, option2, option3, option4],
      };
      const url = endPoint.admin.addQuestion;
      await axios.post(url, payload);
      toast.success("Question added successfully!");
      form.reset();
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-center flex justify-center items-center bg-fixed p-8 min-h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 border-4 border-gray-600 p-6 rounded-lg md:w-1/2 w-full backdrop-blur-sm"
        >
          <h1 className='text-lg font-bold'>Add Question Form</h1>
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your question</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your question" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {['option1', 'option2', 'option3', 'option4'].map((option, index) => (
            <FormField
              key={option}
              control={form.control}
              name={option}
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input placeholder={`Option ${index + 1}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <FormField
            control={form.control}
            name="correctAnswer"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Correct option" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Question"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Index;
