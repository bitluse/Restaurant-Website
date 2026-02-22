"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reservationSchema, ReservationFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, CheckCircle2, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const timeSlots = [
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
];

const occasions = [
  "Birthday",
  "Anniversary",
  "Business Dinner",
  "Date Night",
  "Family Gathering",
  "Other",
];

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        setBookingId(result.data.id);
        toast({
          title: "Reservation Confirmed!",
          description: `Your table has been booked for ${data.date} at ${data.time}`,
        });
        reset();
        setSelectedDate(undefined);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create reservation",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit reservation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setValue("date", format(date, "yyyy-MM-dd"));
    }
  };

  return (
    <section id="booking" className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #d4a574 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold uppercase tracking-[0.2em] text-sm mb-4">
              Reservations
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Reserve Your <span className="text-gold-gradient">Table</span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Secure your spot at Saveur and prepare for an unforgettable dining 
              experience. Whether it&apos;s an intimate dinner for two or a celebration 
              with loved ones, we&apos;re here to make it special.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <span className="text-gold text-xl">📞</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Call Us</p>
                  <p className="text-white font-medium">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <span className="text-gold text-xl">🕐</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Opening Hours</p>
                  <p className="text-white font-medium">Mon-Sun: 12:00 PM - 10:00 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <span className="text-gold text-xl">📍</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white font-medium">123 Gourmet Avenue, Downtown</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card border border-gold/20 rounded-lg p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3
                  className="text-2xl font-bold text-white mb-4"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Reservation Confirmed!
                </h3>
                <p className="text-gray-400 mb-4">
                  Your table has been successfully reserved.
                </p>
                <p className="text-gold font-medium mb-6">
                  Booking ID: {bookingId}
                </p>
                <p className="text-gray-400 text-sm mb-6">
                  A confirmation email has been sent to your email address.
                  We look forward to seeing you!
                </p>
                <Button
                  onClick={() => {
                    setIsSuccess(false);
                    setBookingId("");
                  }}
                  className="bg-gold text-black hover:bg-gold-dark"
                >
                  Make Another Reservation
                </Button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-card border border-gold/20 rounded-lg p-8"
              >
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Full Name</label>
                    <Input
                      {...register("name")}
                      placeholder="John Doe"
                      className="bg-background border-gold/20 focus:border-gold rounded-none"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Email</label>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="john@example.com"
                      className="bg-background border-gold/20 focus:border-gold rounded-none"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Phone</label>
                    <Input
                      {...register("phone")}
                      placeholder="+1 (555) 000-0000"
                      className="bg-background border-gold/20 focus:border-gold rounded-none"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-background border-gold/20 hover:border-gold rounded-none",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-gold" />
                          {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-card border-gold/20" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={handleDateSelect}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.date && (
                      <p className="text-red-400 text-xs">{errors.date.message}</p>
                    )}
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Time</label>
                    <Select onValueChange={(value) => setValue("time", value)}>
                      <SelectTrigger className="bg-background border-gold/20 focus:border-gold rounded-none">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-gold/20">
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.time && (
                      <p className="text-red-400 text-xs">{errors.time.message}</p>
                    )}
                  </div>

                  {/* Guests */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Number of Guests</label>
                    <Select
                      onValueChange={(value) => setValue("guests", parseInt(value))}
                    >
                      <SelectTrigger className="bg-background border-gold/20 focus:border-gold rounded-none">
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-gold/20">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.guests && (
                      <p className="text-red-400 text-xs">{errors.guests.message}</p>
                    )}
                  </div>
                </div>

                {/* Occasion */}
                <div className="space-y-2 mb-6">
                  <label className="text-sm text-gray-300">Occasion (Optional)</label>
                  <Select onValueChange={(value) => setValue("occasion", value)}>
                    <SelectTrigger className="bg-background border-gold/20 focus:border-gold rounded-none">
                      <SelectValue placeholder="Select occasion" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-gold/20">
                      {occasions.map((occasion) => (
                        <SelectItem key={occasion} value={occasion}>
                          {occasion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Special Requests */}
                <div className="space-y-2 mb-8">
                  <label className="text-sm text-gray-300">Special Requests (Optional)</label>
                  <Textarea
                    {...register("specialRequests")}
                    placeholder="Dietary restrictions, seating preferences, etc."
                    className="bg-background border-gold/20 focus:border-gold rounded-none min-h-[100px]"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-gold to-gold-dark text-black font-semibold py-6 rounded-none text-lg uppercase tracking-wider hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 btn-shine"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Confirm Reservation"
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
