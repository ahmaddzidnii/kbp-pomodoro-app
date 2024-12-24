import toast from "react-hot-toast";
import React, { useState } from "react";
import { FaClock } from "react-icons/fa6";
import { Slider } from "@nextui-org/slider";
import { HiSpeakerWave } from "react-icons/hi2";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";

import { Button } from "./Button";
import { optionsSound } from "../constants/optionsSound";
import { useModalOptions } from "../store/useModalOptions";
import { usePomodoroState } from "../store/usePomodoroState";

export const ModalOptions = () => {
  const { isOpen, onClose } = useModalOptions();
  const { state, setState } = usePomodoroState();

  const [currentAudio, setCurrentAudio] = useState(null);
  const [settings, setSettings] = useState({
    timer: {
      pomodoro: state.timers.pomodoro,
      istirahat: state.timers.istirahat,
    },
    audios: {
      pomodoro: state.audios.pomodoro,
      istirahat: state.audios.istirahat,
    },
    volumeAlarm: state.volumeAlarm,
  });

  const handleSave = () => {
    if (settings.timer.pomodoro < 1 || settings.timer.istirahat < 1) {
      toast.error("Timer tidak boleh kurang dari 1 menit");
      return;
    }
    setState({
      ...state,
      timers: {
        pomodoro: settings.timer.pomodoro,
        istirahat: settings.timer.istirahat,
      },
      audios: {
        pomodoro: settings.audios.pomodoro,
        istirahat: settings.audios.istirahat,
      },
    });
    onClose();
  };

  const handleClose = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      timer: {
        pomodoro: state.timers.pomodoro,
        istirahat: state.timers.istirahat,
      },
      audios: {
        pomodoro: state.audios.pomodoro,
        istirahat: state.audios.istirahat,
      },
    }));
    onClose();
  };

  function handleSoundChange(e) {
    const selectedSoundUrl = e.target.value;
    if (selectedSoundUrl) {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      const audio = new Audio(selectedSoundUrl);
      setCurrentAudio(audio);
      audio.volume = state.volumeAlarm;
      audio.play();
    }
    setSettings((setting) => {
      return {
        ...setting,
        audios: {
          ...setting.audios,
          [e.target.id.split("-")[0]]: selectedSoundUrl,
        },
      };
    });
  }

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={handleClose}
      scrollBehavior="inside"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Pengaturan</ModalHeader>
          <ModalBody className="space-y-5">
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <FaClock className="size-5" />
                <span>Timer (menit)</span>
              </div>
              <div className="flex gap-2">
                <div>
                  <label htmlFor="pomodoro-timer">Pomodoro</label>
                  <input
                    id="pomodoro-timer"
                    value={settings.timer.pomodoro}
                    type="number"
                    onChange={(e) => {
                      setSettings({
                        ...settings,
                        timer: {
                          ...settings.timer,
                          pomodoro: e.target.value,
                        },
                      });
                    }}
                    className="w-full rounded-md p-4 text-lg font-bold shadow-[3px_3px_0_0_rgba(0,0,0,1)] border-[3px] border-black placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-black"
                    min={1}
                  />
                </div>
                <div>
                  <label htmlFor="istirahat-timer">Istirahat</label>
                  <input
                    id="istirahat-timer"
                    type="number"
                    value={settings.timer.istirahat}
                    onChange={(e) => {
                      setSettings({
                        ...settings,
                        timer: {
                          ...settings.timer,
                          istirahat: e.target.value,
                        },
                      });
                    }}
                    className="w-full rounded-md p-4 text-lg font-bold shadow-[3px_3px_0_0_rgba(0,0,0,1)] border-[3px] border-black placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <HiSpeakerWave className="size-5" />
                <span>Sound</span>
              </div>
              <div className="flex gap-2">
                <div>
                  <label htmlFor="pomodoro-timer">Pomodoro</label>
                  <select
                    id="pomodoro-sound"
                    className="w-full rounded-md p-4 text-lg font-bold shadow-[3px_3px_0_0_rgba(0,0,0,1)] border-[3px] border-black placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-black"
                    onChange={handleSoundChange}
                    value={settings.audios.pomodoro}
                  >
                    {optionsSound
                      .filter((sound) => sound.scopes.includes("pomodoro"))
                      .map((sound) => (
                        <option
                          key={sound.id}
                          value={sound.link}
                        >
                          {sound.label}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="istirahat-sound">Istirahat</label>

                  <select
                    id="istirahat-sound"
                    className="w-full rounded-md p-4 text-lg font-bold shadow-[3px_3px_0_0_rgba(0,0,0,1)] border-[3px] border-black placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-black"
                    onChange={handleSoundChange}
                    value={settings.audios.istirahat}
                  >
                    {optionsSound
                      .filter((sound) => sound.scopes.includes("istirahat"))
                      .map((sound) => (
                        <option
                          key={sound.id}
                          value={sound.link}
                        >
                          {sound.label}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div>
                <Slider
                  classNames={{
                    base: "w-full",
                    filler: "bg-[#307BA9]",
                    thumb: "bg-[#307BA9] ",
                    track: "border-s-[#307BA9]",
                  }}
                  defaultValue={state.volumeAlarm * 100}
                  label="Volume"
                  maxValue={100}
                  minValue={0}
                  step={1}
                  startContent={<HiSpeakerWave className="size-5" />}
                  onChangeEnd={(value) => {
                    setState({
                      ...state,
                      volumeAlarm: value / 100,
                    });
                  }}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSave}>Simpan</Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};
