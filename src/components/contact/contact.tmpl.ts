const contactTmpl = `
    <div class="contact" id="{{id}}">
        <img class="contact__image" src={{image}}>
        <div class="contact__body">
            <p class="contact__body-name">
                {{title}}
            </p>
            <p class="contact__body-message">{{message}}</p>
        </div>
        <div class="contact__info">
            <p class="contact__time">{{time}}</p>
            <div class="contact__new {{#unless new}}contact__new_hide{{/unless}}">   
                <p class="contact__new-count">{{new}}</p>
            </div>          
        </div>
    </div>
`;
export {contactTmpl};
