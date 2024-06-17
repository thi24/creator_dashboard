import axios from "axios";
import type {Storno} from "~/classes/Storno";

function getBaseURL() {
    return useRuntimeConfig().public.ticketService.baseURL;
}

export function getStorno(eventId: string, onSuccess: (stornos: Storno[]) => void, onError: () => void) {
    axios.get<Storno[]>(getBaseURL() + '/cancellations/' + eventId)
        .then((response) => {
            onSuccess(response.data);
        })
        .catch(() => {
            onError();
        });
}

//Request to ProcessEngine -> to be defined
export function responseToProcessEngine(eventId?: string, ticketId?: string, price?: number, kundenId?: string, response?: boolean, stornoId?: string) {
    axios.post("https://engine.pe.benevolo.de/v1.0/messages/adminResponse1?execution_mode=synchronous",
    {
        "eventId": eventId, 
        "ticketId": ticketId, 
        "price": price, 
        "kundenId": kundenId,
        "stornoResponse": response,
        "stornoId": stornoId
    },
    {
        headers: {
            //"Accept": "/",
            "Authorization": "Bearer ",
            "Content-Type": "application/json"
        }
        
    })
        .then(/* IDK */)
        .catch(/* IDK */);
}