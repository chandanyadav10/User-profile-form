import mongoose from "mongoose";


const userSchema = mongoose.Schema({
   profilePhoto: { 
        type: String, 
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
  username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
  password: { 
        type: String, 
    },
  profession: { 
        type: String, 
        enum: ['Student', 'Developer', 'Entrepreneur'], 
        required: true 
    },
  companyName: { 
        type: String 
    },
  addressLine1: { 
        type: String, 
        
    },
  country: { 
        type: String, 
        required: true 
    },
  state: { 
        type: String, 
       
    },
  city: { 
        type: String, 
        
    },
  subscriptionPlan: { 
        type: String, 
        enum: ['Basic', 'Pro', 'Enterprise'], 
        required: true 
    },
  newsletter: { 
        type: Boolean, 
        
    },
  dob: { 
        type: Date 
    },
  gender: { 
        type: String 
    },
  customGender: { 
        type: String 
    }
}, { timestamps: true })

export default mongoose.model('User', userSchema)