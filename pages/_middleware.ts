import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {

  console.log('Middleware llamado')
  return NextResponse.next();

  // return new Response('Acces Denied', {
  //   status: 401,
  //   headers: {
  //     'x-token': 'Dont exist'
  //   }
  // });
}