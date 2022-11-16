import {ProvideAirtable} from "@project/hooks/airtable";

export default function AirtableDecorator(Story, context) {
    return (
        <div>
            <ProvideAirtable>
                <Story />
            </ProvideAirtable>
        </div>
    );
}
