"use client";

import { useActionState, useEffect, useState, useRef } from "react";
import { sendContactEmail } from "@/app/actions";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  
  // React 19 form actions hook managing submit states & values
  const [state, formAction, isPending] = useActionState(sendContactEmail, null);
  
  // Floating Toast Alert state
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    success: boolean;
  } | null>(null);

  // Monitor server response state changes
  useEffect(() => {
    if (state) {
      setToast({
        show: true,
        message: state.success 
          ? (state.message || "Message sent successfully!") 
          : (state.error || "Failed to dispatch message."),
        success: state.success,
      });

      // Clear the form on successful submission
      if (state.success) {
        formRef.current?.reset();
      }
    }
  }, [state]);

  // Toast self-dismiss timer
  useEffect(() => {
    if (toast?.show) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="relative w-full">
      {/* Dynamic Toast Alert popup */}
      {toast && toast.show && (
        <div
          role="alert"
          className={`fixed bottom-6 right-6 z-50 flex items-center space-x-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 ${
            toast.success
              ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-300"
              : "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-300"
          }`}
        >
          <div className="flex-shrink-0">
            {toast.success ? (
              // Success checkmark icon
              <svg className="h-5 w-5 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            ) : (
              // Error warning icon
              <svg className="h-5 w-5 text-red-600 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          
          <div className="text-xs font-mono font-medium max-w-xs leading-relaxed">
            {toast.message}
          </div>

          <button
            onClick={() => setToast(null)}
            type="button"
            className="ml-auto text-muted-foreground hover:text-foreground text-xs font-bold p-1 rounded-md transition-colors"
            aria-label="Dismiss toast"
          >
            ✕
          </button>
        </div>
      )}

      {/* Static feedback area for inline screen readers */}
      {state && !state.success && (
        <div
          className="mx-auto max-w-xl mb-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-xs font-mono text-red-600 dark:text-red-300"
          aria-live="polite"
        >
          <strong>Validation Error:</strong> {state.error}
        </div>
      )}

      {/* Form Element executing server action */}
      <form
        ref={formRef}
        action={formAction}
        className="mx-auto mt-12 max-w-xl sm:mt-16 space-y-6"
      >
        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-foreground">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              required
              disabled={isPending}
              className="mt-2.5 block w-full rounded-md border-0 bg-card px-3.5 py-2 text-foreground shadow-xs ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 disabled:opacity-60"
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold leading-6 text-foreground">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              disabled={isPending}
              className="mt-2.5 block w-full rounded-md border-0 bg-card px-3.5 py-2 text-foreground shadow-xs ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 disabled:opacity-60"
            />
          </div>
          
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-foreground">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              disabled={isPending}
              className="mt-2.5 block w-full rounded-md border-0 bg-card px-3.5 py-2 text-foreground shadow-xs ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 disabled:opacity-60"
            />
          </div>
          
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-foreground">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              rows={4}
              disabled={isPending}
              className="mt-2.5 block w-full rounded-md border-0 bg-card px-3.5 py-2 text-foreground shadow-xs ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 disabled:opacity-60"
            />
          </div>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            disabled={isPending}
            className="block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-primary-foreground shadow-xs hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}
