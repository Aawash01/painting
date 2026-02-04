"use client";

import React, { useState, useRef } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import {
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Send,
} from "lucide-react";

const services = [
  "Residential Painting",
  "Commercial Painting",
  "Interior Painting",
  "Exterior Painting",
  "Roof Painting",
  "Other",
];

const serviceAreas = [
  "Sydney CBD", "Eastern Suburbs", "Northern Beaches",
  "North Shore", "Inner West", "Western Sydney",
  "Southern Sydney", "Hills District"
];

export default function ContactPage() {
  const { toast } = useToast();
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    
    setIsSubmitting(true);

    // Using credentials from your working reference project
    emailjs
      .sendForm("service_1295ne8", "template_k6c5ccb", form.current, {
        publicKey: "pzd5H6YPeo7pn9DcZ",
      })
      .then(
        () => {
          toast({
            variant: "default",
            description: "Your Message has been sent successfully!",
          });
          setIsSubmitted(true);
          form.current?.reset();
        },
        (error) => {
          console.error("EmailJS Error:", error);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Please try again later.",
          });
        }
      )
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section - Matched to image_789f61.png */}
        <section className="bg-slate-50 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-sky-500 font-semibold text-sm uppercase tracking-widest">
              CONTACT US
            </span>
            <h1 className="text-5xl sm:text-7xl font-bold text-slate-900 mt-4 mb-8">
              Get Your Free Quote
            </h1>
            
            <p className="text-slate-600 text-xl max-w-4xl mx-auto leading-relaxed">
              Ready to transform your space? Contact us today for a free, no-obligation quote. <br className="hidden md:block" />
              Our team is here to help bring your vision to life.
            </p>
          </div>
        </section>

        {/* Contact Content Area - Matched to image_789b61.png */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-16 items-start">
              
              {/* LEFT SIDE: Send Us a Message */}
              <div className="lg:col-span-7">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Send Us a Message</h2>
                {isSubmitted ? (
                  <div className="bg-emerald-50 p-12 rounded-2xl text-center border border-emerald-100">
                    <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-emerald-900 mb-2">Thank You!</h3>
                    <p className="text-emerald-700">We'll get back to you within 24 hours.</p>
                    <Button onClick={() => setIsSubmitted(false)} className="mt-6" variant="outline">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form ref={form} onSubmit={onSubmit} className="space-y-8">
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label htmlFor="from_name" className="text-slate-900 font-medium">Full Name *</Label>
                        <Input id="from_name" name="from_name" required placeholder="John Smith" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="from_email" className="text-slate-900 font-medium">Email Address *</Label>
                        <Input id="from_email" name="from_email" type="email" required placeholder="john@example.com" className="h-12" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-slate-900 font-medium">Phone Number</Label>
                        <Input id="phone" name="phone" placeholder="0400 000 000" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service" className="text-slate-900 font-medium">Service Required</Label>
                        <select 
                          name="service" 
                          className="flex h-12 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                        >
                          <option value="">Select a service</option>
                          {services.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-slate-900 font-medium">Your Message *</Label>
                      <Textarea id="message" name="message" required rows={6} placeholder="Tell us about your project..." />
                    </div>
                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white h-14 px-10 text-lg">
                      {isSubmitting ? "Sending..." : <>Send Message <Send className="ml-2 w-5 h-5" /></>}
                    </Button>
                  </form>
                )}
              </div>

              {/* RIGHT SIDE: Contact Information - Matched to image_783a00.png */}
              <div className="lg:col-span-5 space-y-10">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Contact Information</h2>
                  <p className="text-slate-600 leading-relaxed mb-10 text-lg">
                    Have questions or ready to start your painting project? Reach out to us. We typically respond within 24 hours.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-5">
                      <div className="bg-sky-50 p-4 rounded-xl text-sky-600 shrink-0"><Phone className="w-7 h-7" /></div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg mb-1">Phone</h3>
                        <a href="tel:+61415894507" className="text-slate-600 hover:text-sky-600 transition-colors text-lg">+61 415 894 507</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-5">
                      <div className="bg-sky-50 p-4 rounded-xl text-sky-600 shrink-0"><Mail className="w-7 h-7" /></div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg mb-1">Email</h3>
                        <a href="mailto:info.majesticpainting@gmail.com" className="text-slate-600 hover:text-sky-600 transition-colors text-lg">info.majesticpainting@gmail.com</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-5">
                      <div className="bg-sky-50 p-4 rounded-xl text-sky-600 shrink-0"><Clock className="w-7 h-7" /></div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg mb-1">Business Hours</h3>
                        <p className="text-slate-600 text-lg">Mon - Fri: 7am - 5pm</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Areas Box */}
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-4 text-xl">Service Areas</h3>
                  <p className="text-slate-600 mb-6">We proudly serve the greater Sydney metropolitan area, including:</p>
                  <div className="grid grid-cols-2 gap-4">
                    {serviceAreas.map((area) => (
                      <div key={area} className="flex items-center gap-3 text-slate-600">
                        <CheckCircle className="w-5 h-5 text-sky-500 shrink-0" />
                        <span className="font-medium">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}