const chatTmpl = `
    <div class="chat">
      <div class="chat__menu">
        <div class="chat__menu-top">
          {{{newChatButton}}}    
          {{{settingsButton}}}    
        </div>
        <div class="chat__menu-contacts">
          {{{contactOne}}}
          {{{contactTwo}}}
        </div>
      </div>

      <div class="chat__container">
        {{#if active}}
          <div class="chat__bar">
            <div class="chat__bar-info">
              <img class="chat__bar-image" src={{image}}>
              <p class="chat__bar-contact">
                {{#each contact}}
                    <span>{{this}} </span>
                {{/each}}
              </p>
            </div>
            {{{chatSettingsButton}}}
          </div>
          <div class="chat__body">
          
          </div>
          <div class="chat__input">
            {{{chatAttachButton}}}
            <textarea contenteditable="true" id="messageInput" class="chat__input-field"></textarea>
            {{{chatSendButton}}}
          </div>
          {{/if}}
      </div>
    </div>
`;
export {chatTmpl};