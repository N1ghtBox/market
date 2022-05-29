import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import prisma from "../../lib/prisma";
import styles from "../list/list.module.css"

export const getServerSideProps = async () =>{
    const data = await prisma.soldItems.findMany()
    return {props: {data}}
  }

const List: NextPage = (props: any) => {
    return(
        <>
            <div className={styles.center}>
                <div className={styles.header}>
                    <Link href="/">Home</Link>
                    <p className='is-active'>List</p>
                    <p>Testing</p>
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