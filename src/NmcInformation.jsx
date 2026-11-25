import React from "react";
import { PageHeading } from "./PageHeading.jsx";
import { Footer } from "./Footer.jsx";
const nmcQuestions=["Year of Inception: Government/private","Name","Address with pin code","University address with pin code","Official website","Dean","Mobile Number","Email ID of Dean","Hospital","Date and Year of Registration of the Hospital (DD/MM/YYYY)","Number of Beds","Number of Beds for emergency","Date of the First Letter of Permission (LoP) of MBBS (DD/MM/YYYY) & number of seats","Status of Recognition","Number of MBBS and PG broad specialty and super specialty students admitted in this session","Inpatients registered and admitted (Month / Year)","Outpatients registered and admitted (Month / Year)","Number of Deaths reported to the village register (Month / Year)","Address and pin code of the village where the Death records are reported","Email ID of Village in case Death Records are reported","Number of Births reported (Month / Year)","Address and pin code of the village where the Birth records are reported","Email ID of the authority in case Birth Records are reported","Number of Rooms in Men’s Hostel and students accommodated","Total Number of Rooms in Women’s Hostel and students accommodated","Name of the Grievance Redressal Officer (PIO & CPIO)","Address with pincode","Telephone Number / Email ID","Grievances reported","Details of Post-Graduation Courses offered","Post-Graduate Course"];
export function NmcInformation(){
 return <>
 <main id="main" className="nmc-information-page">
 <PageHeading title="Information As Per NMC Forms"/>
 <section className="wrap nmc-information-content">
 <h2 className="nmc-section-heading">Information As Per NMC Forms</h2>
 <div className="nmc-information-box" role="region" tabIndex={0} aria-label="NMC information table">
 <table className="nmc-information-table nmc-reference-table">
 <colgroup><col style={{width:"6%"}}/><col style={{width:"40%"}}/><col style={{width:"54%"}}/></colgroup>
 <thead><tr><th scope="col">Sr No.</th><th scope="col">Information of the medical college/institution</th><th scope="col">Swaminarayan Medical College, Mahisagar Details</th></tr></thead>
 <tbody>{nmcQuestions.map((question,i)=><tr key={i}><td>{i+1}</td><th scope="row">{question}</th><td className="nmc-answer" aria-label="Not yet provided"></td></tr>)}</tbody>
 </table>
 </div>
 </section>
 </main><Footer/>
 </>;
}
