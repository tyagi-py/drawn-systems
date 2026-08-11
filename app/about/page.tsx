import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Sumit.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-2xl font-medium">About</h1>
      <div className="mt-6 space-y-4 text-muted">
        <p>
          I’m an <strong>AI Engineering Lead</strong> and a builder who likes
          owning hard problems end-to-end — especially when the path from{" "}
          <strong>
            “this might be possible” to “this is running in production”
          </strong>{" "}
          isn&apos;t obvious.
        </p>

        <p>
          Over the last <strong>6+ years</strong>, I’ve worked across Agentic
          AI, Generative AI, machine learning, computer vision, and
          large-scale AI systems, turning ambiguous problems into products
          that deliver measurable business impact.
        </p>

        <p>
          At <strong>Ksolves</strong>, I lead a{" "}
          <strong>20-member AI team</strong> building solutions across GenAI,
          Agentic AI, and traditional ML. One of the systems we built
          replaced manual support workflows with autonomous AI agents and now
          resolves{" "}
          <strong>70% of support tickets without human intervention</strong>.
          My role spans architecture, engineering decisions, and taking these
          systems all the way to production.
        </p>

        <p>
          Before that, at <strong>Paytm</strong>, I took on the problem of
          scaling merchant support with AI. I built and shipped a
          conversational AI system end-to-end using LLMs and in-house NLP
          models that ultimately{" "}
          <strong>
            replaced 25% of merchant help-desk agents and reduced cost per
            call by 15×
          </strong>
          .
        </p>

        <p>
          I also built a lender recommendation system that reduced
          sales-funnel dropout by <strong>87%</strong>, owning everything
          from feature engineering to the production API.
        </p>

        <p>
          Earlier at <strong>Infogain</strong>, I architected{" "}
          <strong>AI &amp; A-Eyes</strong>, a multimodal computer-vision and
          NLP platform for retail monitoring. What started as an AI
          engineering problem became a production platform generating{" "}
          <strong>$14 million in annual revenue</strong> and processing
          roughly <strong>13 GB of image data every day</strong> on Azure.
        </p>

        <p>
          And even earlier, I helped build an AI-powered learning platform
          capable of evaluating handwritten student assignments using
          computer vision and NLP — technology that ultimately reached{" "}
          <strong>1,500+ schools across India</strong>.
        </p>

        <p>
          Along the way, I’ve been named <strong>Employee of the Year</strong>
          , received multiple Employee of the Quarter awards, represented
          Ksolves at the{" "}
          <strong>Gartner Application Summit in Las Vegas</strong>, presented
          research, and received{" "}
          <strong>
            The Indian Express&apos; Most Innovative Use of AI award
          </strong>
          .
        </p>

        <p>
          But titles and awards aren&apos;t really what keep me interested.{" "}
          <strong>I like building things.</strong> I like understanding
          systems deeply enough to simplify them, challenging abstractions
          instead of blindly using them, and turning what I learn into
          something other people can actually use.
        </p>

        <p>
          This website is an extension of that mindset —{" "}
          <strong>my public visual knowledge space</strong>, where I break
          down AI, engineering, architectures, systems, and whatever else
          I’m exploring into interactive boards.
        </p>
      </div>
    </main>
  );
}
