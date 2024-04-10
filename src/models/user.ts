export type Name = {
    first: string;
    last: string;
};

export type Picture = {
    thumbnail: string;
};

export type User = {
    id: string;
    gender: string;
    name: Name;
    picture: Picture;
    authoredBy: string[];
    assignedTo: string[];
};
