//=============================================================================
// CommonEventByStatusAilment.js (Ver1.0.1)
//=============================================================================
// 2020.Sep.01 Ver1.0.0  First Release

/*:
 * @target MZ
 * @plugindesc Call common event when a status ailment is added to or removed from a player.
 * @author Preuk Suksiri
 *
 * @help ButtonPicture.js
 *
 * This plugin calls common event when a status ailment is added to or removed from a player.
 *
 * Call script command once at the start of the game and config this following argument :
 *   1. State ID
 *   2. Common event id when state is added
 *   2. Common event id when state is removed
 *
 * @command set
 * @text Bind State to Common Event
 * @desc Determine which common event should be played upon state start and state end
 *
 * @arg stID
 * @type number
 * @min 1
 * @max 999
 * @default 1
 * @text State ID
 * @desc ID of status ailment (state) that you would like to bind
 *
 * @arg commonEventStart
 * @type common_event
 * @default 1
 * @text Common Event Upon State Start
 * @desc Common event to call when the state is started
 *
 * @arg commonEventEnd
 * @type common_event
 * @default 2
 * @text Common Event Upon State End
 * @desc Common event to call when the state is ended
 */

(() => {

  const pluginName = 'CommonEventByStatusAilment';

	PluginManager.registerCommand(pluginName, "set", args => {
        const stID = Number(args.stID);
		const commonEventStart = Number(args.commonEventStart);
		const commonEventEnd = Number(args.commonEventEnd);
		
		
		if ("scriptCheckCommonEventStartBystID" in Game_Battler.prototype == false)
		{
			Game_Battler.prototype.scriptCheckCommonEventStartBystID = {};
		}
		
		if (stID in Game_Battler.prototype.scriptCheckCommonEventStartBystID == false)
		{
			Game_Battler.prototype.scriptCheckCommonEventStartBystID[stID] = 0;
			
		}
		
		Game_Battler.prototype.scriptCheckCommonEventStartBystID[stID] = commonEventStart;
		
		if ("scriptCheckCommonEventEndBystID" in Game_Battler.prototype == false)
		{
			Game_Battler.prototype.scriptCheckCommonEventEndBystID = {};
		}
		if (stID in Game_Battler.prototype.scriptCheckCommonEventEndBystID == false)
		{
			Game_Battler.prototype.scriptCheckCommonEventEndBystID[stID] = 0;
			
		}
		Game_Battler.prototype.scriptCheckCommonEventEndBystID[stID] = commonEventEnd;
		
	
		
		Game_Battler.prototype.addState = function(stateId){

			
			if (this.isStateAddable(stateId)) {
				if (!this.isStateAffected(stateId)) {
					this.addNewState(stateId);
					this.refresh();
				}
				this.resetStateCounts(stateId);
				this._result.pushAddedState(stateId);

				/*Game_Battler.prototype.scriptCheckCommonEventStartBystID[Object.keys(Game_Battler.prototype.scriptCheckCommonEventStartBystID)[0]] 
				*/
				for (var k in Object.keys(Game_Battler.prototype.scriptCheckCommonEventStartBystID))
				{
					var recordedSt = Object.keys(Game_Battler.prototype.scriptCheckCommonEventStartBystID)[k];
					var recordedCommonEv = Game_Battler.prototype.scriptCheckCommonEventStartBystID[recordedSt];
					
					Game_Battler.prototype.scriptLatestActorIDAffectedByState = this.id;
					$gameTemp.reserveCommonEvent(recordedCommonEv);
					
					break;
				}

				
				
			}
			
		}
		
		
		Game_Battler.prototype.removeState = function(stateId){
			if (this.isStateAffected(stateId)) {
				if (stateId === this.deathStateId()) {
					this.revive();
				}
				this.eraseState(stateId);
				this.refresh();
				this._result.pushRemovedState(stateId);
				
				for (var k in Object.keys(Game_Battler.prototype.scriptCheckCommonEventEndBystID))
				{
					var recordedSt = Object.keys(Game_Battler.prototype.scriptCheckCommonEventEndBystID)[k];
					var recordedCommonEv = Game_Battler.prototype.scriptCheckCommonEventEndBystID[recordedSt];
					
					Game_Battler.prototype.scriptLatestActorIDAffectedByState = this.id;
					$gameTemp.reserveCommonEvent(recordedCommonEv);
					
					break;
				}

			}
			
			
		}
		
    });
	
	
	
	

	
	

})();