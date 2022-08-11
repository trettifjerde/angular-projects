export interface Email {
    id: number,
    sender: string,
    recipients: string[],
    subject: string,
    body: string,
    timestamp: string,
    read: boolean,
    archived: boolean
}

export interface EmailEntry {
    id: number,
    user: string,
    extra: number,
    subject: string,
    timestamp: string,
    read: boolean
}

export interface Mailbox {
    name: string,
    entries: EmailEntry[]
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

export function emailToEntries(emails: Email[], mailbox: string) : EmailEntry[] {
    const entries: EmailEntry[] = [];

    if (mailbox === 'sent'){
        for (let email of emails){
            entries.push({
                id: email.id,
                user : email.recipients[0],
                extra : email.recipients.length - 1,
                subject: email.subject,
                timestamp: email.timestamp,
                read: email.read
            });
        }
    }
    else {
        for (let email of emails) {
            entries.push({
                id: email.id,
                user : email.sender,
                extra : 0,
                subject: email.subject,
                timestamp: email.timestamp,
                read: email.read
            });
        }
    }
    return entries;
}
