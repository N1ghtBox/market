import { useEffect, useState } from "react"
import { defaultFormDataDto, formDataDto } from "../../formDataDto"
import styles from "../form/form.module.css"

export const Form = (props: IProps) =>{
    const [formData, setFormdata] = useState<formDataDto>({...defaultFormDataDto});
    const [valid, setvalid] = useState<boolean>(false);

    const handleInputChange = (value: any, name: string, min?: number, max?: number) =>{
        let localFormData: any = formData ? formData : {}
        if(max) value = value.length > 1 ? value[value.length-1] : value
        if(max && value > max) value = max
        if(min && value < min) value = min
        localFormData[name] = parseInt(value)
        setFormdata({...localFormData})
    }

    useEffect(()=>{
        let allValues = Object.values(formData)
        for (let i = 0; i < allValues.length; i++) {
            let value = allValues[i];
            if(!value) return setvalid(false)
        }
        setvalid(true)
    },[formData])


    return (
        <div className={styles.columnContainer}>
            <h1 className="display">Enter Data</h1>
            <p style={{margin:'0'}}>Fill out form to get results</p>
            
            <div className={styles.rowContainer}>
                <label htmlFor="price">Price <br/>
                <input type="number" id="price" name="price" autoComplete="off" value={formData?.price || ""} onChange={(e)=>handleInputChange(e.target.value, "price")}/></label>
                <label htmlFor="brand">Brand(1-5) <br/>
                <input type="number" name="brand" autoComplete="off" value={formData?.brand || ""} onChange={(e)=>handleInputChange(e.target.value, "brand", 1, 5)}/></label>
            </div>
            <label htmlFor="#functionality">Functionality(1-5) <br/>
            <div className={styles.rowContainer} id="functionality">
                <input 
                    type="number" 
                    value={formData?.functionalityMarketDemand || ""} 
                    name="Market"
                    placeholder="Market demand" 
                    onChange={(e)=>handleInputChange(e.target.value, "functionalityMarketDemand",1,5)}/>
                <input 
                    type="number" 
                    value={formData?.functionalityAdvanceLevel || ""} 
                    name="Advance"
                    placeholder="Advance level" 
                    onChange={(e)=>handleInputChange(e.target.value, "functionalityAdvanceLevel",1,5)}/>
                <input 
                    type="number" 
                    value={formData?.functionality || ""} 
                    name="Functionality"
                    placeholder="Functionality" 
                    onChange={(e)=>handleInputChange(e.target.value, "functionality",1,5)}/>
            </div>
            </label>

            <label htmlFor="#quality">Quality(1-5) <br/>
            <div className={styles.rowContainer} id="quality">
                <input 
                    type="number" 
                    value={formData?.qualityWorkers || ""} 
                    placeholder="Workers"
                    name="Workers" 
                    onChange={(e)=>handleInputChange(e.target.value, "qualityWorkers",1,5)}/>
                <input 
                    type="number" 
                    value={formData?.qualityMachines || ""} 
                    placeholder="Machines"
                    name="Machines" 
                    onChange={(e)=>handleInputChange(e.target.value, "qualityMachines",1,5)}/>
                <input 
                    type="number" 
                    value={formData?.qualityMaterial || ""} 
                    placeholder="Materials" 
                    name="Materials"
                    onChange={(e)=>handleInputChange(e.target.value, "qualityMaterial",1,5)}/>
            </div>
            </label>
            <div className={styles.rowContainer}>
                <button className={styles.submitButton} disabled={!valid} onClick={()=> {props.onSubmit(formData); setFormdata({...defaultFormDataDto})}}>
                    Simulate
                </button>
                <button className={styles.submitButton} disabled={!props.canBeSaved} onClick={(e)=> {props.onAdd(e); setFormdata({...defaultFormDataDto})}}>
                    Save
                </button>
            </div>
        </div>
    )
} 
interface IProps{
    onSubmit: (formData: formDataDto) => void
    onAdd: (e: React.SyntheticEvent) => void
    canBeSaved: boolean
}