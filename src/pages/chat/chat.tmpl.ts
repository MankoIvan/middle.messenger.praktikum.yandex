const chatTmpl = `
    <div class="chat">
      <div class="chat__menu">
        <div class="chat__menu-top">
          {{{newChatButton}}}    
          {{{settingsButton}}}    
        </div>
        {{#if addChatVisible}}
        <div class="chat__menu-add">
          {{{newChatInput}}}
          {{{chatAddChatButton}}}
        </div>
        {{/if}}
        <div class="chat__menu-contacts">
          {{{contactOne}}}
          {{{contactTwo}}}
          {{#each contactsMarkUp}}
            {{{this}}}
          {{/each}}
        </div>
      </div>

      <div class="chat__container">
        {{#if currentChat}}
          <div class="chat__bar">
            <div class="chat__bar-info">
              <img class="chat__bar-image" src={{image}}>
              <p class="chat__bar-contact">
                {{contact}}
              </p>
            </div>
            {{{chatSettingsButton}}}
          </div>
          {{#unless chatSettingsVisible}}
          <div class="chat__body">
          
          </div>
          <div class="chat__input">
            {{{chatAttachButton}}}
            <textarea contenteditable="true" id="messageInput" class="chat__input-field"></textarea>
            {{{chatSendButton}}}
          </div>
          {{/unless}}
          {{#if chatSettingsVisible}}
          <div class="chat__settings">
            <div class="chat__settings-container">
            {{{addUserInput}}}
            {{{addUserButton}}}
              {{#each currentChat.contacts}}
                <div class="chat__settings-user" id={{{id}}}>
                  <p class="chat__settings-login">{{{login}}}</p>  
                  {{{../deleteUserButton}}}
                </div>            
              {{/each}}
              {{{deleteChatButton}}}
            </div>
          </div>
          {{/if}}
          {{/if}}
      </div>
    </div>
`;
export {chatTmpl};
