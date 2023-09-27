# Resources
- [allaboutcircuits.com/](https://www.allaboutcircuits.com/)
- [nuwireless.org/](https://nuwireless.org/)
- [en.wikipedia.org/wiki/The_Art_of_Electronics](https://en.wikipedia.org/wiki/The_Art_of_Electronics)

# Topics to cover
- basic electronics concepts
    - voltage, current, resistance
    - ohm's law
    - AC vs DC
    - resistors, 
- Basic Circuit Theory
    - Series and parallel circuits
    - Kirchhoff's Laws
    - RLC circuits (Resistor, Inductor, Capacitor)
    - Frequency response and resonance
- Introduction to Radio Communication
    - Basic principles of electromagnetic waves
    - Frequency, wavelength, and the electromagnetic spectrum
    - AM (Amplitude Modulation) vs. FM (Frequency Modulation)
- Radio Components
    - Oscillators: Produce radio frequency signals
    - Mixers: Combine signals
    - Filters: Separate desired frequencies from undesired ones
    - Amplifiers: Increase signal strength
    - Detectors/Demodulators: Extract original information from radio waves
    - Antennas: Transmit and receive radio signals
- Radio Receiver Designs
    - Crystal radios
    - Tuned Radio Frequency (TRF) receivers
    - Superheterodyne receivers
    - Direct Conversion receivers
- Transmitters
    - Basic principles of radio transmission
    - Modulation techniques: AM, FM, and Phase Modulation (PM)
    - Power amplifiers and their importance in transmission
- Advanced Modulation Techniques
    - Single Sideband (SSB)
    - Quadrature Amplitude Modulation (QAM)
    - Phase Shift Keying (PSK)
- Digital Radios and Software Defined Radios (SDR)
    - Basics of digital communication
    - Analog-to-Digital Converters (ADC) and Digital-to-Analog Converters (DAC)
    - SDR architectures and principles
- Propagation and Antennas
    - Basics of wave propagation
    - Different types of antennas: dipole, yagi, loop, etc.
    - Antenna tuning and impedance matching
- some advanced topics
    - Satellite radio
    - Digital Audio Broadcasting
    - Cellumar communication principles
    - radio frequency identificationa (RFID) and Near Field Communication (NFC)
- microprocessors

## Voltage, current, resistance
At a high level, electricity is just electrons. Because metals generally have a weak attraction to their electrons, these electrons can easily move between atoms. Electrons "flow" between circuits, and something on the circuit can harvest that flow in order to do certain thing. 

Here is a list of electric devices that can utilize the flow of electrons to do certain things:
- resistors: these devices are specifically built to reduce the flow of electrons, converting the electrical energy into heat.
- semiconductors: these devices utilize electric flow to perform certain computational actions
- motors: these devices utilize the energy from the electric flow to create other types of motion

### Trivial analogy
- Voltage: the water pressure in a pipe
- Current: the rate of water flow in the pipe
- Resistance: the diameter or roughness of the pipe

Also note, every single device, even wires, have some sort of resistance (and thus voltage etc). Electricity has different flows before and after resistors. This is not the case for superconductors, which are materials where there is no resistance present.

### Some definitions
- **static electricity** is when there are too much or too little electrons in a certain object. The built up static charge (which can be an excess or a deficit of electrons) remains in place until it has a path to neutralize. When we (or especially a metal thing) provides this path, then we see a shock. 
- **electric potential difference**: the *work* done to push electrons between two points.

Now onto the full definitions:
- **voltage (V)**: the electrical potential difference between two points. Measured in volts.
- **current (I)**: the flow of electric charge (typically through conductors like a wire). Measured in amperes, or amps (A). 
- **resistance (R)**: opposes the flow of current. Measured in ohms. 

- **Ohm's law**: $V = I x R$. i.e., the voltage, the work done to push electrons through something, is proportional to the flow times the resistance.
- **AC vs DC**: AC stands for "alternating current" while DC stands for "direct current"
    - in DC, the electrons flow in a single direction
    - in AC, the electrons flow back and forth

- **power plants**: DC power plants have positive and negative terminals, while AC power plants two main terminals (one "live" or "hot" and the other "neutral")

## Series and Parallel Circuits
Two-terminal components and electrical networks can either be connected in series, or in parallel. Imagine an image that implements the name here. Based on the design of the circuit here, the resistance and inductance changes.

### Some Definitions
- **total resistance**: "total" resistance in this case refers to the resistance that a power source sees between its terminals. Depending on if the circuit is in series or parallel, the resistance is calculated a different way. 
- **Kirchhoff's first law**: also called "kitchoff's junction rule" states that for any junction in electric current, the sum of the current (I) of the inflows is equal to the sum of the current of the outflows. This is kind of like a node intake outtake problem
- **Kirchhoff's voltage law**: in a completed circuit, the sum of all voltages is equal to zero. The intuition behind this is, once the circuit is connected and everything is in flow, the total number of electrons everywhere kind of equalizes out. Makes sense.

## RLC circuit
An RLC circuit is a circuit that consists of a resistor, inductor, and a capacitor.

### Some Definitions
- **inductor (L)**: A two-terminal component that resists changes in current by creating a magnetic field. This happens because the magnetic field induces a voltage proportional to the rate of change of a current. generally a coil of wire. 
    - The inductor is characterized by the ratio between the voltage to the rate of change of the current, also called the "henry". The higher the ratio, the larger the voltage response from the inductor.
- **capacitor (C)**: A capacitor is like an inductor, but instead of resisting rapid changes in current, a capacitor resists the rapid change in voltage.
    - the capacity of a capacitor is known as "capacitance"

### So what?
A circuit with these components creates a harmonic oscillator - a system that when displaced from the equilibrium, experiences some restoring force proportional to the displacement. This resonance occurs because energy is stored in two different ways: an electric field in the capacitor, and a magnetic field in the inductor. 

Thus, RLC circuits resonate. This means RLC circuits are important for transmitting radio signals and whatnot.

The most basic version of this is a series circuit with a battery, a single resistor, a single inductor, and a single capacitor. When the voltage of the source changes, the RLC circuit will resonate!

## Electromagnetic waves

### Definitions
- wavelength: distance between two humps of a wave
- amplitude: distance from the period to the top
- frequency: the number of waves that pass by a fixed point in a given amount of time
    - frequency is measured in "Hertz" - e.g., number fo waves that pass a fixed point in one second. e.g., 100 Hz implies 100 cycles of a wave occur in one second

### Elctromagnetic Spectrum
Depending on the radition type, the wavelength and frequency is different. Radio waves, for example, have a wavelength of approximately 10^3 meters and a frequency of 10^4 Hz.

### Modulation
The idea is we consistently change a wave in order to encode data. We can modulate the data in two different ways: 
- Amplitude modulation (AM): modify the height of the wave based on the data
- Frequency modulation (FM): modify the length of the wave based on the data 
- Phase modulation: something I don't quite understand, but involves varying the instantaneous phase of a carrier wave.

No way! This is where AM/FM comes from!

To encode data (e.g., 0s and 1s) into waves, Amplitude Shift Keying (ASK), Frequency shift keying (FSK), Phase Shift Keying (PSK) have been developed.

After reception, there is error correction in many cases. 
