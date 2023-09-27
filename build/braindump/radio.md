# General Resources
- r/hamradio
- r/amateurradio
- [hamstudy.org](https://hamstudy.org)      
- electronics.md

# General License Classes

### Explicit Definitions
- **Vara**: A protocol used with winlink
- **azimurthal projection map**: a mpa that shows true bearings and distances from a specific location
- **RF**: radio frequency
- **solar flux index**: measure of solar radioation with a wavelength of 10.7 centimeters
- **zener diode**: 
- **half-wave rectifier**: a circuit where we want to capture half the incoming AC waveform. requires only one diode.
- **electrolytic capacitor**: high capacitence for a given volume
- **bypass capacitor**: takes extra noise or radio frequency interface (RFI) in the system and filters it out
- **diodes**: let current flow in one direction
- **beacon station**: a continuous stream of radio waves, primarily for observation of propagation and reception. condition monitoring.
- **impedance inverse**: admittance
- **ultimate rejection**: a filter's maximum ability to reject signals outside passband
- **WSPR**: low-power beacon for assessing HF propagation (a low power signal is just a whisper!)
- **duty cycle**: the ratio of time a transmitter is actually producing full power, and whe it is at rest. if something is always broadcasting at full power, e.g, 100% of the time, this is "full duty cycle"
- **FT8**: a mode of radio communication used my amatuer radio (Franke Taylor 8)
- **Sideband**: a band of frequencies higher or lower than the carrier frequency. We have the upper (USB) and lower (LSB).
- **receive attenuator**: a device that reduces the amplitude of an eletronic signal. prevents overload from strong incoming signals.
- **bandwidth**: difference between the upper and lower frequencies in a continuous band of frequencies. usually measured in hertz
- **AFSK**: audio frequency-shift keying
- **field-strength meter**: find the strength of RF wave
- **IEEE 802.11**: specifies media access control (MAC), and the physical layer protocols for implementing wireless local area networks (WLAN)
- **spread spectrum**: techniques where a signal 
- **watt**: (V^2)/Ohms = (A^2) (Ohms)
- **MUF**: Maximum Usable Frequency
- **Standing Wave Ratio (SWR)**: measure of impedance matching of loads to the characteristic imedance of a transmission line or guide. e.g., sees how the current matches
- **Antenna Analyzer**: measures impedance of a coaxial cable
- **multipliation factor of FM transmitter**: Transmitter frequency / HF Oscillator Frequency
- **frequency derivation**: transmitter derivation / multiplication factor
- **gain**: how well an antenna converts input power into radio waves headed in some direction
- **waterfall display**: frequency is horizontal, signal strength is intensity, time is vertical
- **reactance**: the opposition to the flow of alternating current in an inductor
- **Dual-VFO**: transmit on one frequency and listen on another
- **QPSK (Quadrature Phase Shift Keying)**: modulation which digital data is transmitted using 0, 90, 180, 270-degree phase shifts to represent bit pairs
- **Sine wave oscillator**: generates a sine wave. consists of an amplifier operating in a feedback loop.
- **PACTOR**: stations established to relay data between radio stations and the internet, relaying internet access to sea-based and isolated users
- **Joule's Law (aka power law)**: P = E x I
- **product detector**: utilized in a single sideband receiver to extract the modulated signal
- **Varicode**: encoding for PSK31
- **RCA connector**: an electrical connector used to carry audio/video signals. used in radio.
- **A-index**: long-term stability of earth's geomagnetic field
- **K-index**: short-term stability of earth's geomagnetic field

### Callsigns
- "KN" -> Listening only for a specific station or stations
- QRP -> Low-power transmission operation
- Q -> is this frequency in use?
- Q in QRV -> "I am ready to receive"

### General Notes
- to break into a phone contact, say your call sign once
- FSK signals are identified by "mark and space"
- capacitors in parallel is better than capacitors in series for increasing total capacitance
- Automatic level control (ALC) with RF power amplifiers prevent excessive drive
- 30 meter band: only data transmission modes, so no image transmission.
- RACES training drills may only happen 1 hour per week
- FT8 users must synchronize their times to something in an NTP pool
- PSK31: uses varicode
- hot wires are connected to fuses
- exam element credit is valid for 365 days after the exam credit is done
- geomagnetic storms affect HF propagation by degrading high-latitude HF propagation
- on the 10 meter band, the symbol transmission rate is capped at 1200 baud
- for a circuit that uses AWG number 14 wiring, 15 ampere resistance is optimal
- max height for an antenna structure without notifying FAA and FCC: 200ft

# Technician Radio License
I want to get my technician radio license. Here are all my notes for that. 


### Explicit Definitions 
- **shorting**: electric current flowing down the unintended path
- **fuse**: fuses remove power from the circuit at a certain amperage. Fuses have a peace of wire in em that melts easily. place these in series with "hot" wires.
- **electric current**: the amount of electricity flowing through a circuit (measured in amperage, or amps). Electric current is measured with an ammeter 
- **interlock**: makes the state of two mechanisms mutually dependent. for example, a mechanical interlock will be required to connect before the institution of any sort of current flowing through the system
- **alternating current (AC)**: current can travel in both directions
- **direct current (DC)**: current travels in one direction only
- **volts**: force at which am ampere is pushed 
- **American AC (alternating current) standard**: 120 Volts @ 60 hz
- **turnbuckle**: used to adjust tension or the lengths of ropes, cables, ties, etc - [wikipedia source](https://en.wikipedia.org/wiki/Turnbuckle)
- **"RF" energy**: Radio frequency energy
- **ionization**: the process of removing an election from an atom. This is dangerous for biological life because living rely on consistent genetic material (whose structure need not be changed nor altered). Different wavelengths have certain energy levels, and therefore have different abilities to ionize atoms. Radio frequency, being at the low end of the electromagnetic spectrum, does not have enough energy for ionization.
- **duty cycle**: another phrase for the cycle of operation 
- **FCC (Federal Communications Commission)**: regulators of amateur radio (and radio in general)
- **phonetic alphabet**: Alfa, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu (used to identify letters precisely. was popularized by NATO)
- **radio beacon**: a device that marks a single location and transmits a continuous signal - [wikipedia page](https://en.wikipedia.org/wiki/Radio_beacon)
- **FCC space station**: The FCC considers amateur stations located more than 50km above the earth's surface. See the approved space station list [here](https://www.fcc.gov/approved-space-station-list)
- **"RACES"**: Radio Amateur Civil Emergency Service
- **Radio Wave Propagation**: radio waves propagate, or move, from transmitter to reciver either through ground waves, sky waves, free space waves, and open field waves 
- **Single Sideband**: A form of amplitude modulation that consumes less bandwidth (Hz), so less energy. 
- **SWR (Standing Wave Ratio)**: indicates quality of "impedance match" (energy match) between radio and antenna system. The goal is to have 1:1 ratio. Energy, in this case, implying the amplitude of the sine wave. 
- **Repeater Offset**: the *offset* between a repeater's transmit and receive frequencies
- **Dual-tone multi-frequency signaling** (DTMF): telecommunication signaling system - [wikipedia page](https://en.wikipedia.org/wiki/Dual-tone_multi-frequency_signaling)
- **Variable Frequency Oscillator**: the frequency tuner! pretty cool lil knob. [wikipedia page](https://en.wikipedia.org/wiki/Variable-frequency_oscillator)
- **Auroral Radio Propagation**: Auroral events (those pretty color events in the arctic), affect radio wave propagation! It hurts high frequency stuff (HF), but can help very high frequency (VHF) stuff 
- **Simplex**: amateur station that's transmitting and reciving on the same frequency
- **Telemetry**: a device that collects data and transmits it back via radio waves
- **ionosphere**: part of the atmosphere where the earth meets space. Ionized by solar radiation (ions have charges!)
- **Meter**: device that measures something and dispays it on a numeric scale
- **Impedance**: opposition to AC current flow (in the other direction)
- **Transciever**: transmitter/reciever in a single package!
- **PTT**: Push to talk
- **Coaxial Cable**: Cable used to connect satellite antenna to stuff. These cables have special sleving to prevent other radio signals from interfering 
- **Electromagnetic interference (EMI)**: unwanted noise or interfernce on an electrical path or circuit originating from an outside source. In the case of radio, this is called *radio-frequency interference*, or RFI. 
- **Semiconductor**: A hybrid conductor and an insulator
- **Phase Shift Keying (PSK)**: a method of digitally transmitting data by changing the phase (the height of the sine wave itself) of the signal 
- **Inductance** the tendancy of an electrical conductor to oppose change in current flowing through it. Unit is the **Henry**. [wikipedia page](https://en.wikipedia.org/wiki/Inductance)
- **Amplifier**: a devlice that can increase the power of a signal (e.g. the height of the sine wave will increase)
- **CQ**: code by wireless ham radio operators. transmitting these letters is an invitation for any operators listening to respond. [wikipedia page](https://en.wikipedia.org/wiki/CQ_(call))
- **Continuous Tone Coded Squelch System (CTCSS)**: This is a type of in-band signaling that's used to reduce the annoyance of listening to other users on a shared two-way radio communication channel - [wikipedia page](https://en.wikipedia.org/wiki/Continuous_Tone-Coded_Squelch_System)
- **Squelch**: a "squelch" is a circuit that suppresses the audio output of a reciever in the absence of a strong input signal. In other words, it enforces a minimum of a sense for audio levels. Squelch works by adding a low-frequency audio tone to the voice. If that tone is not audible or there's a different tone, that user will be "squelched" using CTCSS circuitry. [wikipedia page](https://en.wikipedia.org/wiki/Continuous_Tone-Coded_Squelch_Systeml)
- **Diode**: an electric component that conducts current in primarily one direction. The electrodes within the diode are called the anode and cathode.  [wikipedia page](https://en.wikipedia.org/wiki/Diode)
- **Digital Mobile Radio (DMR) repeaters**
- **Antenna Gain**: the ability of the antenna to radiate more or less energy in any direction compared to a theoretical antenna. This theoretical antenna is sphere-shaped. 
- **Inductor**: A coil of wire that stores energy in a magnetic field when electricity is flowing through it. An electromagnetic force flows through the center of the coil while electricity flows through the wires
- **Polarization of Antenna**: The direction of the electrimagnetic field produced by the antenna as energy radiates away from it - [info page here](https://jemengineering.com/blog-intro-to-antenna-polarization/)
- **Electronic Keyer**: A device that helps you create and send morse code 
- **Ferrite Choke**: Can be placed on a cable to reduce current flow conducted on the shield of cables. [wikipedia page](https://en.wikipedia.org/wiki/Ferrite_bead)
- **Voltage Regulator**: A system designed to automatically maintain a constant voltage. [wikipedia page](https://en.wikipedia.org/wiki/Voltage_regulator)
- **Sporadic E**: A type of propagation method that occurs when clouds of ionized gas form in the E region's atmosphere
- **Reciever Incremental Tuning (RIT)**: fine tuning control for reciever frequency 
- **Rectifier**: turns a current from AC to DC. Uses diodes to move current ina  specific direction
- **Radiogram**: Formal written message transmitted by radio. They use a standard message format
- **Antenna Coupler**: Matches one antenna's impedance to another's impedance
- **Mixer**: converts one signal from one frequency to another (changes the wavelength)
- **CW**: Morse code transmission *or* continuous wave
- **Automatic Packet Reporting System**: general amateur radio based system for digital communcation and whatnot. Can include GPS info along with other communications. [wikipedia page](https://en.wikipedia.org/wiki/Automatic_Packet_Reporting_System)
- **Gateway**: An amateur radio station that connects other amateur stations to the internet 
- **Dummy Load**: A device usd to simulate electrical load

### Misc. Notes
- the exothermic nature of the discharging reaction for batteries can cause a lot of excess heat - therefore, it's important to gradually discharge batteries
- capacitors maintain charge after the circuit's amps drops to 0. in the case of power supplies (which have tons of capacitors), they can stay electrically charged for a long time
- don't climb a radio tower without a helper/observer!
- grounding requirements (the nature of the resistance and type of grounding for your amateur radio tower) depends on local electrical codes
- the **radiation type** of radio signals is **non-ionizing**, meaning the radiation does not have enough energy to remove elections from an atom. 
- radio waves move at the speed of light (vroom)
- watts is a rate (julues per second). watts represents power.
- FCC has radio-frequency exposure regulations 
- There are different kinds of burns other than just thermal - radiation burns exist. Antennas during transmission are *hot*, but it's because of their waves, not necessarily their temp. 
- amateures may contact the international space station :o
- radio repeating exists! recieve + retransmit. there are services for this. Echolink is a good example. 
- higher frequency, higher offset (generally)
- you must always identify on the air when transmitting except when controlling model craft (see: part 97 in FCC legislation)
- Ohm's law: E = I x R (Volts = Amps X Ohms)
- Power = Current x Voltage (Watts = Amps x Volts)
- FCC is king of amateur, btw. 
- amateurs cannot interfere with non-amateur stations
- 1 micro = 1,000,000 pico
- the ability for an object to store electrical charge is measured by the farad
- initialize communications with call signs (return the station's call sign followed by yours)
- valid technician class call sign format: KF1XXX 
- English is the primary identification language
- The **henry** is the **unit of inductance**
- Potentiometers measure displacement of electricity in any given direction, so they measure resistance. It can also be configured as a variable resistor (and therefore can be a volume adjuster. [wikipedia article](https://en.wikipedia.org/wiki/Potentiometer)
- "automatic control" means control where *there isn't a control operator present at the control point*. So like, any computer-controlled radio tower (e.g. a repeater)
- VHF and UHF radiowaves don't bounce off the ionosphere due to their small size, so they need a bit of help to propagate over the horizon (or over the line of sight). Certain weather events such as auroras can help in this case, but we usually can rely on "tropospheric scatter" to handle this. Essentially, signals are reflected back to earth randomly.  
- any licensed radio-er can select a license for vanity reasons!
- the louder your voice, the greater the amplitude of the signal. therefore, when you're overdeviating your modulator (which you want to be 1:1 with the reciever), you can solve the problem by talking a bit quieter
- voltometer measures electric potential
- 146.520MHz is the national simplex calling frequency for 2m bands. 
- one operator/primary station license may be held at any one time
- radio signals *generally* do not penatrate dirt or rock very well. Knife's edge diffraction generally occurs when waves hit a sharp edge, and it allows radio signals to go around/over mountains. [wikipedia page](https://en.wikipedia.org/wiki/Refraction)
- when measuring resistance with an ohmmeter, you don't have to worry about powering the circuit
- FT8 uses audio input and output of a computer running WSJT-X software
- yagi -> greatest gain
- the higher the frequency, the more RF energy is absorbed by water and solids
- wavelength (in meters) = 300 / frequency (mHz)
- CW signal minumum : 150
- multimeter: voltage and resistance
- Meteor scatter comunication is done by refecting radio waves off ionized particles in the ionoshphere (part of the atmosphere) from meteors passing through. 
- Forward current -> passing through LED (light-emitting diode) to emit light
- technicians max out at 200w power
- club station license grants must have at least 4 members
- no indecent/obscene language on the radio!
- common impedance of coaxial cables used in amateur radio is 50 ohms
- transistors have the potential to provide power gain
- SSB voice has 3kHz bandwidth
- vegitation (plants) absorb UHF!
- emergency situations allow all classes of amatuer radio users to operate outside of their designated frequencies
- CW has the least bandwidth (it's continuous, so of course)
- "Spin fading" implies rotation of the satellite and the antennas
- NTSC -> Never The Same Color
- ARQ -> Error Detection 

### Amateur Radio Frequencies

[source](https://en.wikipedia.org/wiki/Amateur_radio_frequency_allocations)
**Low Frequency**:
- 2200 meters (135.7-137.8 kHz)

**Medium Frequency**:
- 630 meters (472-479 kHz) - below commerical AM broadcast band
- 160 meters (1.8-2 mHz) - just above commericial AM broadcast band 

**High Frequency**:
- 80 meters (3.5-4.0 mHz)
- 40 meters (7.0-7.3 mHz)
- 10 meters (28-29.7 mHz) - best long distance. good for phone operation

**Very High Frequency** (30 to 300 mHz):
- 6 meters (50-54 mHz) - phone calling FRQ

**Ultra High Frequency** (300 to 3000 mHz)

note: lower frequency carries longer distances, see:
    - https://physics.stackexchange.com/questions/87751/do-low-frequency-sounds-really-carry-longer-distances

### Wire Information
[source](https://www.bradyid.com/resources/wiring-color-codes)
- **black** wires are **hot** (shut off the circuit breaker before working with these!)
- **red** wires are **secondary hot** (shut off the circuit breaker before working with these!)
- **copper** wires are **ground**. These wires provide paths for electricity to flow in the case of a short or a breaker trip
- **green** wires **redirect excessive electricty**. 
- **white/grey** wires **complete circuits** by grounding them (typically by bringing them to an electrical panel)
- **blue/yellow** wires indicate **plug-in devices**

### Operating Modes
**Phone Modulating Modes** (modes where voice is primary):
- Frequency modulation (FM)
- amplitude modulation (AM)
- single sideband modulation (SSB)

**Digital Modulating Modes**
- PSK31
- Packet
- Radio Teletype (RTTY)
- Multiple Frequency Shift Keying (MFSK)
- FT8 - this mode is capable of low-signal-to-noise operation

**Video Modulating Modes**
- Slow Scan TV (SSTV)
- Fast Scan TV (FSTV-NTSC Standard)

**Continuous Wave**
(None, just continuous wave. it has a min of 150mhz of bandwidth to transmit. also, VHF/UHF band segments 50-50.1 and 144-144.1 are limited to CW)

### Q Codes
Q codes are used to convey quick messages.
- QRM: interference from other stations
- QTH: location
- QSL: a conversation
- QSY: changing frequency (you get QueaSY about a frq)

### Reflection
I had no idea before I started studying for my technician license that radio was such a rabbit hole. I'm satisfied having learned as much as I did, and I'm eager to continue my radio journey.

### Other References
1. [FCC Frequently Asked Questions](https://www.fcc.gov/engineering-technology/electromagnetic-compatibility-division/radio-frequency-safety/faq/rf-safety#Q2)
2. [The Ionosphere](https://scied.ucar.edu/learning-zone/atmosphere/ionosphere)
