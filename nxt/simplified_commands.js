import NXTCommands from './commands.js'
import NXTConstants from './config.js'

export default {  
  async simpleBeep() {
    await NXTCommands.beep(523,500,false);
  },

  async stopMotor(motorPort) {
    const motorPowerPercent = 0; // 0 - 100 forwards 255 - 156 backwards (156 = 100% backwards)
    const regulatedTurnRatio = 0; // 0 - 100 forwards 255 - 156 backwards (156 = 100% backwards)
    await NXTCommands.runMotorCommand(motorPort,motorPowerPercent,
      NXTConstants.motorModes.motorOnBreakRegulated,NXTConstants.motorRegulation.none,
      regulatedTurnRatio,NXTConstants.motorRunState.running,0);
  },
  
  async forwardMotor(motorPort) {
    const motorPowerPercent = 100; // 0 - 100 forwards 255 - 156 backwards (156 = 100% backwards)
    const regulatedTurnRatio = 0; // 0 - 100 forwards 255 - 156 backwards (156 = 100% backwards)
    await NXTCommands.runMotorCommand(motorPort,motorPowerPercent,
      NXTConstants.motorModes.motorOnBreakRegulated,NXTConstants.motorRegulation.none,
      regulatedTurnRatio,NXTConstants.motorRunState.running,0);
  },
  
  async backwardMotor(motorPort) {
    const motorPowerPercent = 156; // 0 - 100 forwards 255 - 156 backwards (156 = 100% backwards)
    const regulatedTurnRatio = 0; // 0 - 100 forwards 255 - 156 backwards (156 = 100% backwards)
    await NXTCommands.runMotorCommand(motorPort,motorPowerPercent,
      NXTConstants.motorModes.motorOnBreakRegulated,NXTConstants.motorRegulation.none,
      regulatedTurnRatio,NXTConstants.motorRunState.running,0);
  },
  
  async motorAOneRevolution() {
    await NXTCommands.turnMotorDegrees(NXTConstants.motors.PORT_A,360,true);
  },
  
  async turnMotorSpeed(motorPort,speed,forward) {
    const motorPowerPercent = (forward) ? speed : 256 - speed; // 0 - 100 forwards 255 - 156 backwards (156 = 100% backwards)
    const regulatedTurnRatio = 0; // 0 - 100 forwards 255 - 156 backwards (156 = 100% backwards)
    await NXTCommands.runMotorCommand(motorPort,motorPowerPercent,
      NXTConstants.motorModes.motorOnBreakRegulated,NXTConstants.motorRegulation.none,
      regulatedTurnRatio,NXTConstants.motorRunState.running,0);
  },
  
  async turnMotorDegrees(motorPort,degrees,forward) {
    const motorPowerPercent = (forward) ? 25 : 225; // 0 - 100 forwards 255 - 156 backwards (156 = 100% backwards)
    const regulatedTurnRatio = 0; // 0 - 100 forwards 255 - 156 backwards (156 = 100% backwards)
    await NXTCommands.runMotorCommand(motorPort,motorPowerPercent,
      NXTConstants.motorModes.motorOnBreakRegulated,NXTConstants.motorRegulation.none,
      regulatedTurnRatio,NXTConstants.motorRunState.running,degrees);
  }
}