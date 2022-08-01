import { useContractWrite, usePrepareContractWrite, useContractRead, useContract } from "wagmi"
import { useState } from "react"
import { useEffect } from "react";



export default function PurposeSetter(){

    const [newPurpose, setNewPurpose] = useState('');

    const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnerSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"msgSetter","type":"address"},{"indexed":false,"internalType":"string","name":"newMessage","type":"string"}],"name":"PurposeSet","type":"event"},{"inputs":[],"name":"getPurpose","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"purpose","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newMessage","type":"string"}],"name":"setNewPurpose","outputs":[],"stateMutability":"nonpayable","type":"function"}]

    const purposeContract = useContractRead({
        addressOrName: '0x8775C082217055a317F449F6bA938114316B1059',
        contractInterface: contractABI,
        functionName: 'getPurpose'
    })


    const {data, error, loading, write } = useContractWrite({
        mode: 'recklesslyUnprepared',
        addressOrName: '0x8775C082217055a317F449F6bA938114316B1059',
        contractInterface: contractABI,
        functionName: 'setNewPurpose',
        args: newPurpose
    })


    return (
        <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
            Current Purpose: {purposeContract.data}
        <div>
            Set New Purpose:
            <input placeholder="Enter New Purpose Here" onChange={e => setNewPurpose(e.target.value)}></input>
        </div>
        <button onClick={() => write()}>Set Purpose</button>
        </div>
    )
}