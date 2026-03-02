import topicDataJson from "../../public/data/learning-paths.json";

export interface TopicCode {
    c: string;
    cpp: string;
}

export interface TopicData {
    id: string; // The key like "flowcharts"
    title: string;
    explanation: string;
    tldr: string;
    syntax?: TopicCode;
    example?: TopicCode;
}

export function getTopicsList(): TopicData[] {
    const rawData: Record<string, any> = topicDataJson;
    return Object.keys(rawData).map(key => ({
        id: key,
        ...rawData[key]
    })) as TopicData[];
}
