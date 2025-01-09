import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const formSchema = z.object({
  question: z.string(),
  option1: z.string(),
  option2: z.string(),
  option3: z.string(),
  option4: z.string(),
  correctAnswer: z.string(),
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

  const onSubmit = async (values) => {
    try {
          setLoading(true);
          await axios.post('api/question/addQuestion', values);
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
    <div
      className="h-screen bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('bg.png')" }}
    >
      <Form>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 border-4 border-white p-6 rounded-lg w-1/2 backdrop-blur-sm"
        >
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
