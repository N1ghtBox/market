import { formDataDto } from "./formDataDto";
import { predictDto } from "./predictDto";

export function mapToDto(data: formDataDto): predictDto{
    return{
        price: data.price,
        brand: data.brand,
        functionality:Math.round((data.functionality * 0.4) + (data.functionalityMarketDemand * 0.4) + (data.functionalityAdvanceLevel * 0.2)),
        quality:Math.round((data.qualityMachines * 0.4) + (data.qualityMaterial * 0.3) + (data.qualityWorkers * 0.3))
    }
}