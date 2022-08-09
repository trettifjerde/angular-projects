export interface Email {
    id: number,
    sender: string,
    recipients: string,
    subject: string,
    body: string,
    timestamp: string,
    read: boolean,
    archived: boolean
}

export interface EmailEntry {
    id: number,
    sender: string,
    subject: string,
    timestamp: string,
    read: boolean
}

export interface Mailbox {
    name: string,
    emails: EmailEntry[]
}

export interface FormInfo {
    sender: string,
    recipients: string,
    subject: string,
    body: string
}

export function emailToReplyFormInfo(userEmail: string, email: Email) : FormInfo {
    return {
        sender: userEmail,
        recipients: email.sender, 
        subject: `Re: ${email.subject}`,
        body: `\n---\n${email.body}`
    };
}
