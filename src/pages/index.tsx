import React, { useState, useRef, Suspense, useEffect } from "react";
import { NextPage } from 'next'
import Head from '@/containers/Head'
import { Home } from '@/containers/Home'

const IndexPage: NextPage = () => {
  

  return (
    <>
      <Head />
      <Home />
    </>
  )
}

export default IndexPage