export interface link {
  href: string;
  text: string;
  leads: string[];
}

export const LINKS: { [id: string]: link } = {
    '': { 
        href: '', 
        text: 'Google Search', 
        leads: ['images', 'advanced'] 
    },
    images: { 
        href: 'images', 
        text: 'Google Image', 
        leads: ['', 'advanced'] 
    },
    advanced: { 
        href: 'advanced', 
        text: 'Advanced Search', 
        leads: [''] 
    },
};
