import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";

import { useModalOptions } from "../store/useModalOptions";
import { Button } from "./Button";
import { FaClock } from "react-icons/fa6";
import { HiSpeakerWave } from "react-icons/hi2";
import toast from "react-hot-toast";
import { usePomodoroState } from "../store/usePomodoroState";

export const ModalOptions = () => {
  const { isOpen, onClose } = useModalOptions();
  const { state, setState } = usePomodoroState();

  const [settings, setSettings] = useState({
    timer: {
      pomodoro: state.timers.pomodoro,
      istirahat: state.timers.istirahat,
    },
    sound: {
      pomodoro: 0.1,
      istirahat: 0.2,
    },
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
    });
    onClose();
  };
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Pengaturan</ModalHeader>
          <ModalBody className="space-y-5">
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <FaClock className="size-5" />
                <span>Timer</span>
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
                  <input
                    id="pomodoro-timer"
                    type="number"
                    className="w-full rounded-md p-4 text-lg font-bold shadow-[3px_3px_0_0_rgba(0,0,0,1)] border-[3px] border-black placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-black"
                    min={1}
                  />
                </div>
                <div>
                  <label htmlFor="istirahat-timer">Istirahat</label>
                  <input
                    id="istirahat-timer"
                    type="number"
                    className="w-full rounded-md p-4 text-lg font-bold shadow-[3px_3px_0_0_rgba(0,0,0,1)] border-[3px] border-black placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
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
