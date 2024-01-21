import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./config.firebase"

export const createUser = async ({ email, password }) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        return {
            messsage: user,
            status: 200
        }

    } catch (error) {
        if (error.code == "auth/email-already-in-use") {

            return {
                messsage: "Email already in use",
                status: 400
            }
        }
        return {
            messsage: error,
            status: 400
        }
    }
}
export const LogInUser = async ({ email, password }) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return {
            messsage: result,
            status: 200
        }
    } catch (error) {
        if (error.code == "auth/invalid-credential") {
            return {
                messsage: "Invalid crendential ",
                status: 400
            }
        }
        else if (error.code == "auth/too-many-requests") {
            return {
                messsage: "Too many attempt login after some time ",
                status: 400
            }
        }
        else return {
            messsage: error,
            status: 400
        }
    }
}

export const ResetPasswordViaEmail = async ({ email }) => {

    try {
        const resultmailresult = await sendPasswordResetEmail(auth, email);
    
        return {
            messsage: resultmailresult,
            status: 200
        }
    } catch (error) {
        if(error.code='auth/too-many-requests'){
        return {
            messsage:" Attempt to many times, Try again after Sometimes",
            status: 400
        }}
        else{
            return {
                messsage:error.code,
                status: 400
            }
        }
    }
}

