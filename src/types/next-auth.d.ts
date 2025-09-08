import NextAuth from "next-auth";
import type {
  SubscriptionType,
  User as PrismaUser,
  Course,
  Section,
  Subsection,
  Challenge,
  Progress,
  Account,
  Session as PrismaSession,
  VerificationToken,
  Prisma,
} from "@prisma/client";

/* ----------------------------
   NextAuth Overrides
---------------------------- */
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    subscription: "free" | "pro" | "lifetime";
    cancelAt?: Date | null;
    canceled?: boolean;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      subscription: "free" | "pro" | "lifetime";
      cancelAt?: Date | null;
      canceled?: boolean;
    };
  }
}

/* ----------------------------
   Prisma Extended Types
---------------------------- */

// User with relations
export type UserWithRelations = PrismaUser & {
  accounts: Account[];
  sessions: PrismaSession[];
  progress: Progress[];
};

// Course with nested sections + subsections
export type CourseWithSections = Prisma.CourseGetPayload<{
  include: {
    sections: {
      include: {
        subsections: true;
      };
    };
  };
}>;

// Section with subsections
export type SectionWithSubsections = Prisma.CourseGetPayload<{
  include: {
    sections: {
      include: {
        subsections: true;
      };
    };
  };
}>["sections"][0];

// Subsection with challenge + progress
export type SubsectionFull = Prisma.SubsectionGetPayload<{
  include: {
    challenge: true;
    progress: true;
  };
}>;
