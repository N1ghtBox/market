import { PrismaClient } from "@prisma/client";
import { GetStaticProps, NextPage } from "next";
import styles from "../list/list.module.css"

export const getStaticProps: GetStaticProps = async () =>{
    const prisma = new PrismaClient()
    const data = await prisma.soldItems.findMany()
    return {props: {data}}
  }

const List: NextPage = (props: any) => {
    return(
        <>
            <div className={styles.center}>
                <div className={styles.header}>
                    <a href="/">Home</a>
                    <p className='is-active'>List</p>
                    <a href="">Testing</a>
                </div>
                <table className={`table ${styles.stripedTable}`} style={{width: '60%' ,textAlign:'center', color:'rgb(255, 223, 223)'}}>
                    <thead className="thead-dark" style={{color:'rgb(209, 82, 188)', fontSize:'32px'}}>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Price</th>
                        <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.data?.map((item: any)=>(
                                <tr key={item.id}>
                                    <th scope="row" style={{maxWidth:'100px'}}>{item.id}</th>
                                    <td style={{maxWidth:'200px'}}>{item.price}</td>
                                    <td style={{maxWidth:'100px'}}>{item.amount}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default List