import { MemberStatus, MemberType } from "../enums/member.enum";

export interface Member {
    _id: string;
    memberName: string;
    memberEmail: string;
    memberPhone: number;
    memberType: MemberType;
    memberStatus: MemberStatus;
    memberImage?: string;
    memberAddress?: string;
    memberDesc?: string;
    memberPoints?: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface MemberInput {
    memberName: string;
    memberEmail: string;
    memberPhone: number;
    memberPassword: string;
    memberType?: MemberType;
    memberStatus?: MemberStatus;
    memberImage?: string;
    memberAddress?: string;
    memberDesc?: string;
    memberPoints?: number;
}

export interface LoginInput {
    memberPhone: number;
    memberEmail: string;
    memberPassword: string;
}

export interface MemberUpdateInput {
    memberName?: string;
    memberEmail?: string;
    memberPhone?: number;
    memberPassword?: string;
    memberType?: MemberType;
    memberImage?: string;
    memberAddress?: string;
    memberDesc?: string;
}
