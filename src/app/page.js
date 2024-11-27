import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import FloatingButton from "./components/FloatingButton";
import App from "./components/App";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("home");

  return (<App><SliceZone slices={page.data.slices} components={components} /> 
    
    
           
           
            
     <FloatingButton /></App>);
}

export async function generateMetadata() {
  const client = createClient();
  const page = await client.getSingle("home");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}