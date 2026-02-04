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

    // Initializing with credentials from your working reference
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
        <section className="bg-muted py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">Get Your Free Quote</h1>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-12">
              
              {/* LEFT SIDE: The Form */}
              <div className="lg:col-span-7">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                {isSubmitted ? (
                  <div className="bg-primary/10 p-12 rounded-xl text-center border border-primary/20">
                    <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                    <p className="text-muted-foreground mb-6">Your message has been sent successfully.</p>
                    <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                  </div>
                ) : (
                  <form ref={form} onSubmit={onSubmit} className="space-y-6 bg-card p-8 rounded-xl border">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="from_name">Full Name *</Label>
                        <Input id="from_name" name="from_name" required placeholder="Aawash bhandari" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="from_email">Email Address *</Label>
                        <Input id="from_email" name="from_email" type="email" required placeholder="john@gmail.com" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" placeholder="+00 000 000 000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service">Service Required</Label>
                        <select name="service" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary">
                          <option value="">Select a service</option>
                          {services.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea id="message" name="message" required rows={6} placeholder="Tell us about your project..." />
                    </div>
                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                      {isSubmitting ? "Sending..." : <>Send Message <Send className="ml-2 w-4 h-4" /></>}
                    </Button>
                  </form>
                )}
              </div>

              {/* RIGHT SIDE: Contact Information */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <p className="text-muted-foreground mb-8">
                    Have questions or ready to start your painting project? Reach out to us. We typically respond within 24 hours.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg text-primary"><Phone className="w-6 h-6" /></div>
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <a href="tel:+61415894507" className="text-muted-foreground hover:text-primary transition-colors">+61 415 894 507</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg text-primary"><Mail className="w-6 h-6" /></div>
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <a href="mailto:info.majesticpainting@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">info.majesticpainting@gmail.com</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg text-primary"><Clock className="w-6 h-6" /></div>
                      <div>
                        <h3 className="font-semibold">Business Hours</h3>
                        <p className="text-muted-foreground">Mon - Fri: 7am - 5pm</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-6 rounded-xl">
                  <h3 className="font-semibold mb-4 text-lg">Service Areas</h3>
                  <p className="text-sm text-muted-foreground mb-4">We proudly serve the greater Sydney metropolitan area, including:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {serviceAreas.map((area) => (
                      <div key={area} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span>{area}</span>
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