// create-job.dto.ts
export class CreateJobDto {
    title: string;
    description: string;
    budget?: number;
    deadline?: Date;
    is_payment_verified?: boolean;
    is_job_completed?: boolean;
    created_at?: Date;
    updated_at?: Date;
    client_profile_id?: number;
    freelancer_profile_id?: number;
    payslip?: any; // Assuming Payslip type
  }
  
  // create-service.dto.ts
  export class CreateServiceDto {
    title: string;
    description: string;
    standard_offer: number;
    premium_offer: number;
    butter_offer: number;
    freelancer_profile_id?: number;
  }
  

  // create-bid.dto.ts
export class CreateBidDto {
    description: string;
    attachment: string;
    offer_time: number;
    offer_rate: number;
    freelancer_profile_id: number;
  }
  
  // update-bid.dto.ts
  export class UpdateBidDto {
    description?: string;
    attachment?: string;
    offer_time?: number;
    offer_rate?: number;
  }
  