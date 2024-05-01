import {Card} from "antd";
import {PointCardStyle} from "@/containers/point-card/point-card.style";

export interface PointCartProps {
    title: string
    content: any;
    className?: string
}

export const PointCart = ({title, content, className}: PointCartProps) => {
    return <PointCardStyle className={className}>
        <Card title={title} bordered={false}>
            <p>{content}</p>
        </Card>
    </PointCardStyle>
}
