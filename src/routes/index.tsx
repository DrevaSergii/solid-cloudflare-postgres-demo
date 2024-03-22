import postgres from 'postgres'
import { cache, createAsync } from "@solidjs/router";
import { Show } from "solid-js";

const getRouteData = cache(async () => {
  'use server';
  const sql = postgres('DATABASE_URL');
  const data = await sql`SELECT 1 + 1 as sum`;

  return JSON.stringify(data, null, 2);
}, 'data')

export const route = {
  load: () => getRouteData()
};

export default function Home() {
  const data = createAsync(() => getRouteData());

  return (
    <Show when={data()}>
      <>{data()}</>
    </Show>
  );
}
