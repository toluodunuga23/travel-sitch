"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { z } from "zod";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateEvent = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const eventSchema = z.object({
    title: z.string().min(2).max(50),
    date: z.date(),
    location: z.string().min(2).max(50),
    host: z.string().min(2).max(50),
    description: z.string().min(2).max(50),
    price: z.number().min(0),
    capacity: z.number().min(0),
    isOnline: z.boolean(),
    // url: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
    },
  });

  const { setValue, watch } = form;

  function onSubmit(values: z.infer<typeof eventSchema>) {
    console.log("Event Created", values);
  }

  return (
    <>
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 ">
        <h2 className="font-bold text-3xl"> Create a NY Event</h2>
        <p className="mt-3 text-gray-500 text-xl">
          Please provide the following information for your event.
        </p>
        <div className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl>
                      <Input placeholder="i.e. NYE Party" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="i.e. A fun night out with friends"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isOnline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>In Person or Online Event </FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Choose an otpion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in-person">In Person</SelectItem>
                          <SelectItem value="online">Online</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="i.e. 123 Main St, New York, NY"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-4">
                        <div className="flex flex-col gap-3">
                          <Label htmlFor="date-picker" className="px-1">
                            Date
                          </Label>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                id="date-picker"
                                className="w-32 justify-between font-normal"
                              >
                                {date
                                  ? date.toLocaleDateString()
                                  : "Select date"}
                                <ChevronDownIcon />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto overflow-hidden p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={date}
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                  setDate(date);
                                  setOpen(false);
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="flex flex-col gap-3">
                          <Label htmlFor="time-picker" className="px-1">
                            From
                          </Label>
                          <Input
                            type="time"
                            id="time-picker-from"
                            step="1"
                            defaultValue="10:30:00"
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                          />
                        </div>
                        <div className="flex flex-col gap-3">
                          <Label htmlFor="time-picker" className="px-1">
                            To
                          </Label>
                          <Input
                            type="time"
                            id="time-picker-to"
                            step="1"
                            defaultValue="11:30:00"
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is this a Paid Event </FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Choose an otpion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input placeholder="i.e. 100" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
