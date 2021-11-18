import React from 'react';

import { dayMonth } from '../helpers/dates-format';

export const OutgoingMessage = ({ msg }) => {
    return (
        <div className="outgoing_msg">
            <div className="sent_msg">
                <p>{ msg.message }</p>
                <span className="time_date">{ dayMonth( msg.createdAt ) }</span>
            </div>
        </div>
    );
}
