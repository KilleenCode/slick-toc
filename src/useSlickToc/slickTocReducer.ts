import { Reducer } from "react";
import { getNodes } from "./get-nodes";

type Actions = { type: "getNodes" };

export type NodeInfo = {
    parentKey?: string | undefined;
    name: string;
    element: Element;
};
export const reducer: Reducer<NodeInfo[], Actions> = (state, { type }) => {
    switch (type) {
        case "getNodes":
            const nodes = getNodes();
            console.log(nodes);
            if (nodes.length !== state.length) {
                return nodes;
            }
            return state;
        default:
            return state;
    }
};
