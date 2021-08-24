const messageTmpl = `
    <div class="message{{#if incoming}} message_incoming{{/if}}" id={{id}}>
        <div class="message__wrap">
            <p class="message__text">{{text}}</p>
        </div>
        
    </div>
`;
export {messageTmpl};
