import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Form } from '../components/form/form'
import { mapToDto } from '../dtomapper'
import { formDataDto } from '../formDataDto'
import { predictDto } from '../predictDto'
import styles from '../styles/Home.module.css'
import { PrismaClient } from '@prisma/client'
import Router from 'next/router'

export const getStaticProps: GetStaticProps = async () =>{
  const prisma = new PrismaClient()
  const data = await prisma.soldItems.findMany({take:5})
  return {props: {data}}
}

const Home: NextPage = (props: any) => {
  const [predictData, setPredictData] = useState<predictDto>();
  const [predictedValue, setPredictedValue] = useState<number>();

  const onSubmit = (data: formDataDto) =>{
    let dto = mapToDto(data)
    setPredictData({...dto})
  }

  const calculateValue = (data: predictDto): number =>{
    return (data.price * Importance.priceImportance) + 
            (data.brand * Importance.brandImportance) + 
            (data.functionality * Importance.functionalityImportance) + 
            (data.quality * Importance.qualityImportance)  
  }

  useEffect(() => {
    if(!predictData) return
    let localPredictedValue = calculateValue(predictData!)
    setPredictedValue(localPredictedValue)
  }, [predictData])

  const onAdd = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { predictData, predictedValue };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Market Simulation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <p className='is-active'>Home</p>
        <a href="list">List</a>
        <a href="">Testing</a>
      </div>
      <div className={styles.content}>
        <div>
          <Form onSubmit={onSubmit} canBeSaved={!!predictedValue} onAdd={onAdd}/>
        </div>
        <div className={styles.toLeft}>
          <div style={{height: '80%', width:'60%'}} >
            <h1 className="display">Few examples</h1>
              <ul className={styles.list}>
                {
                  props.data.map((sold: any) => (<li key={sold.id}>{sold.price}zł - {sold.amount}</li>))
                }
              </ul>
          </div>
          <p style={{color:'rgb(255, 223, 223)', fontSize:'26px', width:'60%'}}>Your predicted value:<br/> <span style={{color:'rgb(209, 82, 188)', fontSize:'32px'}}>{predictedValue}</span> </p>
        </div>
      </div>
    </div>
  )
}
const multiplier = 200

const Importance = {
  brandImportance: 0.2 * multiplier,
  functionalityImportance: 0.3 * multiplier,
  qualityImportance: 0.3 * multiplier,
  priceImportance: -0.2 * multiplier,
}

export default Home
