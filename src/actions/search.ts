'use server'

import { redirect } from "next/navigation";

export async function search(formData: FormData) {
  const term = formData.get('term');
  if(!term || term === '')
    redirect('/')

  redirect(`/search?term=${term}`);
}
