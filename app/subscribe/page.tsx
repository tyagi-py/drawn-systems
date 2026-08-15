import type { Metadata } from "next";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Get new boards and updates in your inbox.",
};

export default function SubscribePage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-2xl font-medium">Subscribe</h1>
      <p className="mx-auto mt-4 max-w-md text-balance text-muted">
        Get new boards and updates in your inbox. No spam, unsubscribe
        anytime.
      </p>
      <div className="mx-auto mt-10 max-w-md">
        <NewsletterForm />
      </div>
    </main>
  );
}
