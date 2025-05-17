import { JSX } from "react";

export enum SelectedPage {
    Leaderboard = "Leaderboard",
    Benefits = "benefits",
    OurClasses = "ourclasses",
    ContactUs = "contactus",
    Dashboard = "dashboard"
  }
  
  export interface BenefitType {
    icon: JSX.Element;
    title: string;
    description: string;
  }
  
  export interface ClassType {
    name: string;
    description?: string;
    image: string;
  }
