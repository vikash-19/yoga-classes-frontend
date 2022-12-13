import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header/header'
import styles from './Home.module.scss'
import LeftShow from '../components/leftShow/leftShow'
import RightShow from '../components/rightShow/rightShow'
import Modal from '../../components/Modal'
import ModalWarnings from '../components/ModalWarnings/ModalWarnings'
import ModelEnroll from '../components/ModelEnroll/ModelEnroll'
import {useHome} from '../../customHooks'
import { MessageContext } from '../../components/MessageStack/MessageStack'
const Home = () => {
    const {addSuccess,addError} = useContext(MessageContext)
    const navigate = useNavigate()  ;
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [enrollState , setEnrollrollState] = useState("enroll")
    const {data,status,  isLoading ,refetchData, isSuccess} = useHome()
    const [batch , setBatch] = useState(null)
    const [payment, setPayment] = useState(null)
    useEffect(()=>{
        if(!isLoading){
            setBatch(data.currSubscription?.batch)
            setPayment(data.payment)
        }
    },[isLoading,status])

    function renderModal(){
        if(!enrollState)
            return null
        if(enrollState==="overAge"){
            return (
                <ModalWarnings messageTitle={"Not eligible to Enroll!\n"} messageDesc={" Your age is exceeding 65."}/>
            )
        } else if(enrollState==="underAge"){
            return (
                <ModalWarnings messageTitle={"Not eligible to Enroll!\n"} messageDesc={"Your age is Below 15."} />
            )
        } else if(enrollState === "duePayment"){
            return (
                <ModalWarnings messageTitle={"Not eligible to Enroll!\n"} messageDesc={"Your last payment is due."}/>
            )
        } else if(enrollState === "enroll"){
            return(
                <ModelEnroll  setModal={setIsModalOpen} refetchData={refetchData} batch={batch} setBatch={setBatch} {...data}/>
            )
        } else return null
    }
    return (
        <React.Fragment>
        {!isLoading &&
            <div className = {styles.home}>
                <Header username = {data.username}/>
                <main className={styles.main}>
                    <div className={styles.show}>
                        <LeftShow {...data}/>
                        <div></div>
                        <RightShow modal={isModalOpen} batch={batch} setBatch={setBatch} setEnrollrollState={setEnrollrollState}  setModal={setIsModalOpen} 
                        {...data} 
                        payment={payment}
                        setPayment= {setPayment}
                        refetchData={refetchData}
                        />
                    </div>
                </main>
            </div>
        }
        <Modal modal={
            isModalOpen} 
            setModal={setIsModalOpen}
            title={((enrollState==="enroll")?"Enroll":"Warning")}
            >
        {
            renderModal()
        }

        </Modal>
        </React.Fragment>
    )
}

export default Home
