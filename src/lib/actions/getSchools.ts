'use server'
import { database } from "@/firebase/firebase.config"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { ISchoolInfo } from "../types/school.type"

export const getSchools = async() => {
  try {
    const schoolData = await getDocs(collection(database, 'Schools'))
    const allSchools: ISchoolInfo[] = []
    
    schoolData.forEach(school => allSchools.push(school.data() as ISchoolInfo))

    return allSchools
  } catch (error) {
    console.error(error)
  }
}

export const getSingleSchool = async(schoolId: string) => {
  try {
    const schoolData = await getDoc(doc(database, 'Schools', schoolId))
    const school = schoolData.data()

    return school as ISchoolInfo
  } catch (error) {
    console.error(error)
  }
}