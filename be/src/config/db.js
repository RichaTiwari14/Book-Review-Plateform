import mongoose from "mongoose";

export const connectDB = async () => {
try {
const conn = await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB connected:", conn.connection.host);
} catch (err) {
console.error("Mongo error:", err.message);
process.exit(1);
}
};

src/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
{
name: { type: String, required: true, trim: true },
email: { type: String, required: true, unique: true, lowercase: true, trim: true },
password: { type: String, required: true, minlength: 6 },
},
{ timestamps: true }
);

userSchema.pre("save", async function (next) {
if (!this.isModified("password")) return next();
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
next();
});

userSchema.methods.matchPassword = function (candidate) {
return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toJSON = function () {
const obj = this.toObject();
delete obj.password;
return obj;
};

export default mongoose.model("User", userSchema);

