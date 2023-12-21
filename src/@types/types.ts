export interface IParams {
    name?: string;
    archetype?: string;
    level?: string;
    attribute?: string;
    banlist?: string;
    cardset?: string;
    fname?: string;
    race?: string;
    type?: string;
    format?: string;
    linkmarker?: string;
    misc?: string;
    staple?: string;
    startdate?: string;
    enddate?: string;
    dateregion?: string;
    language?: string;
    sort?: string;
    offset?: string;
}


export interface IYuGiOhCardSet {
    set_name: string,
    set_code: string,
    set_rarity: string,
    set_rarity_code: string,
    set_price: string
} 

export interface IYuGiOhCardImage {
    id: number,
    image_url: string,
    image_url_small: string,
    image_url_cropped: string
} 
export interface IYuGiOhCardPrice {
    cardmarket_price: string,
    tcgplayer_price: string,
    ebay_price: string,
    amazon_price: string,
    coolstuffinc_price: string
} 

export interface YuGiOhCardProps {
    item: IYuGiOhCard,
    openModal: (isOpen: boolean, item?: IYuGiOhCard) => void
}

export interface ModalViewProps {
    closeModal: (isOpen: boolean, item?: IYuGiOhCard) => void,
    isModalVisible: boolean,
    card?: IYuGiOhCard | null
}

export interface CardsProps {
    cards: IYuGiOhCard[] | []
}

export interface IYuGiOhCard {
    id: number,
    name: string,
    type: string,
    frameType: string,
    desc: string,
    atk: number,
    def: number,
    level: number,
    race: string,
    attribute: string,
    archetype: string,
    card_sets: Array<IYuGiOhCardSet>,
    card_images: Array<IYuGiOhCardImage>
    card_prices: Array<IYuGiOhCardPrice>
}

export interface IYuGiOhResponse {
    data: Array<IYuGiOhCard>
}
