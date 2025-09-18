import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center p-6">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0"></div>

      {/* Home Button */}
      <Button
        className="absolute top-6 left-6 bg-white/30 backdrop-blur-sm text-black hover:bg-white/50"
        onClick={() => navigate("/")}
      >
        Home
      </Button>

      <div className="relative z-10 max-w-2xl w-full space-y-8">
        <h1 className="text-5xl font-extrabold text-white text-center">
          Contact Us
        </h1>

        <Card className="p-8 bg-white/20 backdrop-blur-lg border border-white/30 text-white shadow-xl space-y-6">
          {submitted ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Thank you!</h2>
              <p>We received your message and will get back to you soon.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Name</label>
                <input
                  type="text"
                  required
                  className="p-2 rounded-md text-black"
                  placeholder="Your Name"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Email</label>
                <input
                  type="email"
                  required
                  className="p-2 rounded-md text-black"
                  placeholder="you@example.com"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Message</label>
                <textarea
                  required
                  className="p-2 rounded-md text-black"
                  placeholder="Write your message..."
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full bg-green-500 text-white hover:bg-green-400">
                Send Message
              </Button>
            </form>
          )}
        </Card>
      </div>
    </section>
  );
}
