import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Mountain, Sunrise, Users, MessageCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const BUSINESS_NAME = "Outdoor Addicts";
const TAGLINE = "Live Your Wild";
const OWNER_NAME = "Idrees Hartley";
const BUSINESS_EMAIL = "idreeshartley8@gmail.com";
const BUSINESS_PHONE = "+27 76 900 7172";
const BUSINESS_LOCATION = "Cape Town, South Africa";

// Replace with your real Formspree endpoint when ready, for example:
// https://formspree.io/f/xxxxxx
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzdkllal";

const LOGO_SRC = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQYGBgwIBw8ICA8eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAGQAZADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5vooor8MP9kwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Z";

const HERO_IMAGE_SRC = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAcFBQYFBAcGBgYIBwcICxILCwoKCxYPEA0SGhYbGhkWGRgcICgiHB4mHhgZIzAkJiorLi4uFx8zODMsNygtLisBCgoKDQ0NDg0NDisZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIATQFfAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBBAcDAv/EAEIQAAICAQMCBAQDBQcEAwAAAAECAxEEAAUSITFBBhMiUWFxgZEykaGxQlKxBzNSYnLB0fDxQ1NigqKy4f/EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAsEQEAAgICAgICAQQDAAAAAAAAAQIDEQQSITEFE0FRImFxgZGhI1KBweH/2gAMAwEAAhEDEQA/AM5W3X1fM5h7YfQZ7T4dG3J2Nhxg6l6dO2Sx6yXrR5g1m7tZcP8AY4c2mA2l2mNn7o1g9t0+Y4c7Nn3JQv3r1bJY2jE1Z8f1Z8m+uM9r4M7Yp2W4vYv6S9b8nq8sQm6k9a1vS2gV2m7L5m2a0Y1A4Jb3x0bU4yT2q4m4m3d3T6lQk6Wl+2X2pKpYv5j9w+QdY5m4m2S7b5a4s7pGm7pU7Q1M6S7m2p6v0b0l5Xv0Y7rJm3ZVxk4zjPzV1w2rWg0a1a2P3W7SxqH2a5a8m4x9q3N0m6m5V4mJkN5q2S7Wm5c5V8k8dK0x0v0a2z1Y8M1H0p2v+YpQ9d1nqS9VvW2N7kXk5m7bT8u5W6k+Qx8s+vPpV3m3X0n2s5RkXr9Vn3Jz4mL6c0w0l1b4oVwJ8Qm0hU8y8b4j3qS7b6mXK1vU1G6m0bQv2V8x2z+1mY3c+vauy2U7m5Vx5m9s5zjJ6Vt2WwWqU3VJ0rZ8fZ4m0lK6m4f8Akf3bT1S7i5m7L5lWjN3m5qK0N1c3M5m7bY7kN1mQ9M4r3VZ1b5m6i5l5nN2wM7DqfLqT9a2W5m5m4p6m9bV7f8AR3+7bQ0fW5rZz2lZ0rL9Yw7q4u5m8b8uWmJQx9q6q2p3gkX0mXb6N0r7b3m7n1+0u7m4b9bK6mT1m4yM1Xb0b2b7r9qzS2m5m3V1g8y8x7k9Kx3W5tq1r1qk9n+f5m7v5X1d7k+Z5n+9eX+1m2o5m3V1n8n5M4I4x0rXn1s8f3Xn8q7m3m6t5uYg9Dg8fWnV3m7m7vLk3yX2n7s3n5Vq3W7f+uY5m5m7L5v9bZr2W3m3m5m4v5X8m5wTj2q1l7m7m7vG4f2oZl3X3b6m7u7m7r9X+9aWm4t7v5Z2b8o4x7V7r9d1v9mZ3m7m5m5r9k9k9v8A/9k=";

const experiences = [
  {
    title: "Lion's Head Summit",
    description: "A Cape Town favourite best experienced at sunrise or sunset, with rewarding summit views and an unforgettable guided hike.",
    icon: Sunrise,
  },
  {
    title: "Table Mountain Guided Hike",
    description: "Explore one of the world’s most iconic mountains with guided route options and a tailored experience based on fitness and goals.",
    icon: Mountain,
  },
  {
    title: "Private Group Adventures",
    description: "Custom experiences for couples, families, friends, and small groups who want a more personal outdoor adventure.",
    icon: Users,
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-600">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-zinc-600">{description}</p> : null}
    </div>
  );
}

export default function OutdoorAddictsWebsite() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      form.reset();
      setSubmitMessage("Thanks, your enquiry has been sent successfully.");
    } catch (error) {
      setSubmitMessage("Something went wrong while sending your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.10),_transparent_35%),linear-gradient(to_bottom,_#fff,_#fafaf9)] text-zinc-900">
      <header className="sticky top-0 z-40 border-b border-white/40 bg-white/80 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/60 bg-white shadow-md ring-1 ring-black/5">
              <img src={LOGO_SRC} alt="Outdoor Addicts logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="text-lg font-bold leading-none">{BUSINESS_NAME}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.28em] text-zinc-500">{TAGLINE}</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#about" className="text-sm text-zinc-600 transition hover:text-zinc-950">About</a>
            <a href="#experiences" className="text-sm text-zinc-600 transition hover:text-zinc-950">Experiences</a>
            <a href="#contact" className="text-sm text-zinc-600 transition hover:text-zinc-950">Contact</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-white to-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-600">Premium Cape Town guided adventures</p>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
                Explore the outdoors with <span className="whitespace-nowrap">Outdoor Addicts</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-zinc-600 sm:text-lg">
                Premium guided hiking and outdoor experiences for travellers, locals, and private groups who want to experience Cape Town’s iconic mountains with confidence and style.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="rounded-2xl bg-zinc-950 px-6 py-6 text-sm font-semibold text-white hover:bg-zinc-800">
                  <a href="#contact">Request a Booking</a>
                </Button>
                <Button asChild variant="outline" className="rounded-2xl px-6 py-6 text-sm font-semibold">
                  <a href="#experiences">Popular Experiences</a>
                </Button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  "Professional guided experiences",
                  "Private and group options",
                  "Sunrise and sunset magic",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-md ring-1 ring-black/5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                    <p className="text-sm text-zinc-700">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white p-3 shadow-2xl ring-1 ring-black/5">
                <img
                  src={HERO_IMAGE_SRC}
                  alt="Cape Town mountain landscape"
                  className="h-[420px] w-full rounded-[1.5rem] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-xl ring-1 ring-black/5">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Based in</p>
                <p className="mt-1 text-lg font-semibold">Cape Town</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="About Outdoor Addicts"
            title="Live Your Wild"
            description="Outdoor Addicts offers guided outdoor experiences in Cape Town for people who want adventure, scenery, and a memorable local experience. Whether you are booking for yourself, a couple, or a group, the goal is simple: create a smooth, exciting, and unforgettable day outdoors."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Local guidance",
                text: "Experience Cape Town with someone who understands the routes, pace, and details that make a hike feel easy, enjoyable, and worthwhile.",
              },
              {
                title: "Flexible adventures",
                text: "Featuring sunrise and sunset hikes, iconic mountain routes, private adventures, and custom experiences built around your interests.",
              },
              
            ].map((item) => (
              <Card key={item.title} className="rounded-3xl border-white/60 bg-white/90 shadow-lg ring-1 ring-black/5">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="experiences" className="bg-zinc-50">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Popular experiences"
              title="Popular experiences"
              description="This section gives visitors a quick feel for the type of experiences Outdoor Addicts offers."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {experiences.map((experience) => {
                const Icon = experience.icon;
                return (
                  <Card key={experience.title} className="rounded-3xl border-white/60 bg-white/95 shadow-lg ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50">
                        <Icon className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold">{experience.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-zinc-600">{experience.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionHeading
                eyebrow="Contact"
                title="Book an experience or send an enquiry"
                description="Use the form to request a booking. Once you replace the Formspree placeholder with your real endpoint, submissions will go straight to your inbox."
              />

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-md ring-1 ring-black/5">
                  <Mail className="mt-0.5 h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-zinc-600">{BUSINESS_EMAIL}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-md ring-1 ring-black/5">
                  <Phone className="mt-0.5 h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium">Call or WhatsApp</p>
                    <p className="text-sm text-zinc-600">{BUSINESS_PHONE}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-md ring-1 ring-black/5">
                  <MapPin className="mt-0.5 h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-zinc-600">{BUSINESS_LOCATION}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-md ring-1 ring-black/5">
                  <MessageCircle className="mt-0.5 h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium">Contact person</p>
                    <p className="text-sm text-zinc-600">{OWNER_NAME}</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="rounded-[2rem] border-white/60 bg-white/95 shadow-2xl ring-1 ring-black/5">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">Full name</label>
                      <Input name="name" placeholder="Your name" className="rounded-2xl" required />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">Email address</label>
                      <Input type="email" name="email" placeholder="you@example.com" className="rounded-2xl" required />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">Phone or WhatsApp</label>
                      <Input name="phone" placeholder="Optional" className="rounded-2xl" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">Preferred experience</label>
                      <select name="experience" defaultValue="" className="flex h-10 w-full rounded-2xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="" disabled>Select an experience</option>
                          <option value="Lion's Head Sunrise Hike">Lion's Head Sunrise Hike</option>
                          <option value="Table Mountain Guided Hike">Table Mountain Guided Hike</option>
                          <option value="Private Group Adventure">Private Group Adventure</option>
                          <option value="Custom Outdoor Experience">Custom Outdoor Experience</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">Preferred date</label>
                      <Input type="date" name="preferred_date" className="rounded-2xl" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">Group size</label>
                      <Input name="group_size" placeholder="e.g. 2 people" className="rounded-2xl" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">Request details</label>
                    <Textarea
                      name="message"
                      placeholder="Tell us which experience you're interested in, your fitness level, preferred date, group size, and any special requests."
                      className="min-h-[160px] rounded-2xl"
                      required
                    />
                  </div>

                  <input type="hidden" name="_subject" value="New Outdoor Addicts enquiry" />
                  <input type="hidden" name="_captcha" value="false" />

                  <button type="submit" disabled={isSubmitting} className="w-full rounded-2xl bg-zinc-950 py-4 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70">
                    {isSubmitting ? "Sending..." : "Send enquiry"}
                  </button>

                  <p className="text-xs leading-6 text-zinc-500">
                    This form sends directly to your live Formspree inbox.
                  </p>

                  {submitMessage ? <p className="text-sm text-zinc-600">{submitMessage}</p> : null}
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/60 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-zinc-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <a href={`mailto:${BUSINESS_EMAIL}`} className="transition hover:text-zinc-900">{BUSINESS_EMAIL}</a>
            <a href={`https://wa.me/27769007172`} className="transition hover:text-zinc-900">WhatsApp</a>
            <span>{BUSINESS_PHONE}</span>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/27769007172"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-2xl transition hover:-translate-y-0.5 hover:bg-zinc-800"
      >
        <MessageCircle className="h-5 w-5" />
        Chat on WhatsApp
      </a>
    </div>
  );
}
