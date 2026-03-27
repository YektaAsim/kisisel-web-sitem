import { supabase } from "@/lib/supabase";

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export async function submitContactMessage(values: ContactFormValues) {
  const payload = {
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
  };

  console.log("Contact form submitted:", payload);

  const { error } = await supabase.from("messages").insert([payload]);

  if (error) {
    throw error;
  }

  return payload;
}
